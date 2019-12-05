//Applications.js

import React from "react"
import "components/Application.scss"
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"
import useApplicationData from "../hooks/useApplicationData"


export default function Application() {
  
  //Manages APP state
  const {state, setDay, bookInterview, deleteInterview} = useApplicationData()


  //returns an array of object for the current day's appointments
  const appointments =  getAppointmentsForDay(state, state.day)


  //returns an array of objects for that day's interviewers
  const interviewers = getInterviewersForDay(state, state.day)


  //takes in the current day's appointments array and returns a components for each appointment in the array
  //This functions get called in the "schedule" section below
  const printAppoints = appointments.map(appointment => {

      return (
                <Appointment 
                            key={appointment.id}
                            id={appointment.id}
                            time={appointment.time}
                            interview={getInterview(state, appointment.interview)}
                            interviewers = {interviewers}
                            bookInterview = {bookInterview}
                            deleteInterview = {deleteInterview}
                />
      )
  }) 

  
  //due to css need to add this at appointments render for last appoint
  let lastApp = <Appointment key="last" time="5pm" />;
  printAppoints.push(lastApp)

  
  //render
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
  )
}
