// eslint-disable-next-line 
import React, {useState, useEffect} from "react";
import axios from "axios";
export default function useApplicationData(initial) {
  
  // ==== STATE ==== //
  //manages all tracked states of the app
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  // ==== DB REQUEST ON APP LOAD ====//
  // Loads data from api then add to states that are being tracked 
  useEffect(()=>{
    Promise.all([
      axios.get("http://localhost:8000/api/days"), 
      axios.get("http://localhost:8000/api/appointments"), 
      axios.get("http://localhost:8000/api/interviewers"), 
    ])
    .then((all)=> {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      });
    }, []
  ); //close useEffect


  // ==== SET DAY ==== /
  //allows to change state on selected day
  const setDay = day => setState({ ...state, day });


  // ==== BOOKING INTERVIEW ==== //
  // booking new interview in available appointment spot
  const bookInterview = (id, interview) => {

    //updating available appointment object
    const appointment = {
      ...state.appointments[id],
      interview: {...interview }
    };

    //adding new appointment to appointments
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //to integer to update db
    const newId = Number(id);

    //db update
    return axios.put(`http://localhost:8000/api/appointments/${newId}`, {interview})
          .then(() => {
            setState(prev => ({...state, appointments}))
          })
          
  }; //closes bookInterview


  
  // ==== Deleting Interview ==== //
  const deleteInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newId = Number(id);

    return axios.delete(`http://localhost:8000/api/appointments/${newId}`)
      .then(()=>{
        setState(prev=>({...state, appointments}))
      })
  }; //closes deleting interview


  return {state, setDay, bookInterview, deleteInterview};
};

