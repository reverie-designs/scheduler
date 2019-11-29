import React, {useState, useEffect} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  

  //manages all tracked states of the app
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  //allows to change state on selected day
  const setDay = day => setState({ ...state, day });


  // Loads data from api once at page load
  // then add  them to states that are being tracked 

  useEffect(()=>{
    Promise.all([
      axios.get("http://localhost:8000/api/days"), 
      axios.get("http://localhost:8000/api/appointments"), 
      axios.get("http://localhost:8000/api/interviewers"), 
    ])
    .then((all)=> {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      });
  }, []); //close useEffect


  //returns an array of object for the current day's appointments
  const appointments =  getAppointmentsForDay(state, state.day);

  //returns an array of objects for that day's interviewers
  const interviewers = getInterviewersForDay(state, state.day);

  //booking new interview in available appointment spot
  const bookInterview = (id, interview) => {
    // console.log("THIS IS appointment id", id, "THis is ", interview);
    // console.log(interview);

    //updating available appointment object
    const appointment = {
      ...state.appointments[id],
      interview: {...interview }
    };
    console.log('THIS IS new APP info', appointment);
    //adding new appointment to appointments
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("THIS IS NEW AAPSS info", appointments);
    //integer to update db
    const newId = Number(id);
    return axios.put(`http://localhost:8000/api/appointments/${newId}`, {interview})
          .then(() => {
            setState(prev => ({...state, appointments}))
          })
          
  }; //closes bookInterview

  //Deleting Interview
  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
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

  //takes in the current day's appointments array and returns a components for each appointment in the array     
  const printAppoints = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
      return (
        <Appointment 
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers = {interviewers}
          bookInterview = {bookInterview}
          deleteInterview = {deleteInterview}
        />
      )
  }); 

  //due to css neeed to add this at appointments render for last appoint
  let lastApp = <Appointment key="last" time="5pm" />;
  printAppoints.push(lastApp);

  

  //actual render
  return (
    <main className="layout">

      <section className="sidebar">

        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />

        <hr className="sidebar__separator sidebar--centered" />

        <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day = {state.day}
              setDay={setDay}
            />
        </nav>

        <img className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>

      <section className="schedule">

       {printAppoints}

      </section>

    </main>
  );
}
