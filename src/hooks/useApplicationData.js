//useApplicationData.js
// eslint-disable-next-line 
import React, {useEffect, useReducer} from "react"
import axios from "axios"
import reducer, {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW} from "../reducers/application"


export default function useApplicationData() {
  
  // ==== INITIAL STATE ==== //
  //manages all tracked states of the app 
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    // interviewers: {}
  })


  // ==== SET DAY ==== //
  // allows to change state on selected day
  const setDay = day => dispatch({ type: SET_DAY, day })
  

  // ==== DB REQUEST ON APP LOAD ====//
  // Loads data from api then add to states that are being tracked 
  useEffect(()=>{
    
    //SOCKETS
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)
    socket.addEventListener('open', () => {
      console.log('connected to server')
      socket.send('ping')
    })

    // socket.onmessage = msg => {
    //   const data = JSON.parse(msg.data);
    //   data.type === SET_INTERVIEW && dispatch({ ...data });
    // }

    socket.onmessage = msg => {
      const data = JSON.parse(msg.data);
      data.type === SET_INTERVIEW && dispatch({ ...data, fromRemote: true })
    }

    // webSocket.addEventListener("message", msg => {
    //   const data = JSON.parse(msg.data);
    //   dispatch({
    //     ...data,
    //     fromRemote: true
    //   })
    //API REQUESTS
    Promise.all([
      axios.get("/api/days"), 
      axios.get("/api/appointments"), 
      axios.get("/api/interviewers"), 
    ])
    .then((all)=> {
        dispatch({type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
      })
    return () => socket.close();
    },[]
  )//close useEffect


  // ==== BOOKING INTERVIEW ==== //
  // booking new interview in available appointment spot
  const bookInterview = (id, interview) => {
    
    //to integer to update db
    const newId = Number(id)
    
    //db update
    return axios.put(`/api/appointments/${newId}`, {interview})
          .then(() => {
            dispatch({type: SET_INTERVIEW, id, interview}) 
          })       
  } //closes bookInterview


  // ==== Deleting Interview ==== //
  const deleteInterview = (id) => {
    
    //to integer to update db
    const newId = Number(id)

    //db update
    return axios.delete(`/api/appointments/${newId}`)
      .then(() => {
        dispatch({type: SET_INTERVIEW, id})
      })
  } //closes deleting interview


  return {state, setDay, bookInterview, deleteInterview}
}

