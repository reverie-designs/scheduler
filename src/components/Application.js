import React, {useState, useEffect} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12:00pm",
  },
  {
    id: 2,
    time: "12:30pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2.5,
    time: "12:45pm"
  },
  {
    id: 3,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "1:30pm",
    interview: {
      student: "Lee Walters",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "3pm",
    interview: {
      student: "Mark Jones",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/LpaYcom82x.png",
      }
    }
  },
];

const printAppoints = appointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment}
      />
    )
}); 

export default function Application(props) {

  const [days, setDays] = useState([]);
 
  // Loads days from api once at page load
  useEffect(()=>{
    axios.get("http://localhost:8000/api/days")
      .then((response)=> 
        setDays(response.data)); } , []);


  const [day, setDay] = useState("Monday");
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
          days={days}
          day = {day}
          setDay={setDay}
        />
        </nav>
        <img className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
       {printAppoints}
       <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
