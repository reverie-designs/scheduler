// eslint-disable-next-line 
import React, {useEffect, useReducer} from "react"
import axios from "axios"


const SET_DAY = "SET_DAY"
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
const SET_INTERVIEW = "SET_INTERVIEW"


// ==== REDUCER ==== //
const reducer = (state, action) => {
  switch (action.type) {

    case SET_DAY:
      return { ...state, day: action.day }

    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers}

    case SET_INTERVIEW: {

      //updating available appointment object
      const appointment = {
        ...state.appointments[action.id],
        interview: (action.interview ? {...action.interview} : null)
      };

      //adding new appointment to appointments
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      }

      return {  ...state, id: action.id, appointments: appointments }
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

export default function useApplicationData() {
  
  // ==== STATE using REDUCER ==== //
  //manages all tracked states of the app
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    // interviewers: {}
  })

  
  // ==== DB REQUEST ON APP LOAD ====//
  // Loads data from api then add to states that are being tracked 
  useEffect(()=>{
    Promise.all([
      axios.get("http://localhost:8000/api/days"), 
      axios.get("http://localhost:8000/api/appointments"), 
      axios.get("http://localhost:8000/api/interviewers"), 
    ])
    .then((all)=> {
        dispatch({type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
      })
    }, []
  ) //close useEffect


  // ==== SET DAY ==== //
  // allows to change state on selected day
  const setDay = day => dispatch({ type: SET_DAY, day })
  

  // ==== BOOKING INTERVIEW ==== //
  // booking new interview in available appointment spot
  const bookInterview = (id, interview) => {

    //current day
    const dayId = state.days.filter(day => day.name === state.day)[0].id

    // does current appoint allready have an interivew scheduled - is this an edit
    let interviewExistence = state.appointments[id].interview
    
    //to integer to update db
    const newId = Number(id)
    
    //db update
    return axios.put(`http://localhost:8000/api/appointments/${newId}`, {interview})
          .then(() => {
            if (!interviewExistence){
              state.days[dayId-1].spots--
            }
            dispatch({type: SET_INTERVIEW, id, interview}) 
          })   
          
  } //closes bookInterview


  // ==== Deleting Interview ==== //
  const deleteInterview = (id) => {
    const dayId = state.days.filter(day => day.name === state.day)[0].id
    const newId = Number(id)
    return axios.delete(`http://localhost:8000/api/appointments/${newId}`)
      .then(()=>{
        state.days[dayId-1].spots++
        dispatch({type: SET_INTERVIEW, id})
      })
  } //closes deleting interview


  return {state, setDay, bookInterview, deleteInterview}
}

