// eslint-disable-next-line 
import React, {useEffect, useReducer} from "react"
import axios from "axios"


const SET_DAY = "SET_DAY"
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
const SET_INTERVIEW = "SET_INTERVIEW"

// ==== HeLPER FUNCTION === //

// const getSpots = (updatedAppointments) => {
//   let spotsRemainingPerDay = [];
//   let spotsLeftInDay = 0;
//   let appointmentSlotsCounter = 0;
  
//   //loop through each appointment slot to count empty slots (null)
//   for (let appointment of Object.values(updatedAppointments)) {
//     if (!appointment.interview) {
//       spotsLeftInDay++;
//     }
//     appointmentSlotsCounter++;
//     //when day is finished, reset counters to check next day
//     if (appointmentSlotsCounter === 5) {
//       spotsRemainingPerDay.push(spotsLeftInDay);
//       spotsLeftInDay = 0;
//       appointmentSlotsCounter = 0;
//     }
//   }
//   return spotsRemainingPerDay;
// }


// ==== REDUCER ==== //
const reducer = (state, action) => {
  switch (action.type) {

    case SET_DAY:
      return { ...state, day: action.day }

    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers}

    // case SET_INTERVIEW: {

    //   //updating available appointment object
    //   const appointment = {
    //     ...state.appointments[action.id],
    //     interview: (action.interview ? {...action.interview} : null)
    //   };

    //   //adding new appointment to appointments
    //   const appointments = {
    //     ...state.appointments,
    //     [action.id]: appointment
    //   }

    //   // const arr = getSpots(appointments);          
    //   // for (let i in arr) {
    //   //   state.days[i].spots = arr[i];
    //   // }
    //   return {  ...state, id: action.id, appointments: appointments }
    // }
    case SET_INTERVIEW: {
      const { id, interview } = action;
      return {
        ...state,
        days: state.days.map((day) => {
          let spotCounter = 0;
          if(day.name === state.day) {
            if (interview && state.appointments[id].interview) {
              spotCounter = 0;
            } else if(interview) {
              spotCounter = -1;
            } else {
              spotCounter = 1;
            }
          } 
          return {...day,
                  spots: day.spots + spotCounter};
        }),
        appointments: {
          ...state.appointments,
          [id]: {
            ...state.appointments[action.id],
            interview: action.interview ? {...interview} : null
          } 
        }
      }
    }
    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

export default function useApplicationData() {
  
  // ==== INITIAL STATE ==== //
  //manages all tracked states of the app this is 
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
    Promise.all([
      axios.get("/api/days"), 
      axios.get("/api/appointments"), 
      axios.get("/api/interviewers"), 
    ])
    .then((all)=> {
        dispatch({type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
      })
    }, []
  )//close useEffect


  // ==== BOOKING INTERVIEW ==== //
  // booking new interview in available appointment spot
  const bookInterview = (id, interview) => {

    //current day
    const dayId = state.days.filter(day => day.name === state.day)[0].id

    // checks if current appoint allready has an interivew scheduled - is this an edit?
    let interviewExistence = state.appointments[id].interview
    
    //to integer to update db
    const newId = Number(id)
    
    //db update
    return axios.put(`/api/appointments/${newId}`, {interview})
          .then(() => {
            // if (!interviewExistence){
            //   state.days[dayId-1].spots--
            // }
            dispatch({type: SET_INTERVIEW, id, interview}) 
          })       
  } //closes bookInterview


  // ==== Deleting Interview ==== //
  const deleteInterview = (id) => {

    //current day
    const dayId = state.days.filter(day => day.name === state.day)[0].id
    
    //to integer to update db
    const newId = Number(id)

    //db update
    return axios.delete(`/api/appointments/${newId}`)
      .then(() => {
        // state.days[dayId-1].spots++
        dispatch({type: SET_INTERVIEW, id})
      })
  } //closes deleting interview


  return {state, setDay, bookInterview, deleteInterview}
}

