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


  const setDay = day => setState({ ...state, day });


  // Loads days from api once at page load
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

  //takes in the above array and returns a components for each appointment in the array     
  const printAppoints = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
      return (
        <Appointment 
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers = {interviewers}
        />
      )
  }); 

  let lastApp = <Appointment key="last" time="5pm" />;
  printAppoints.push(lastApp);

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
