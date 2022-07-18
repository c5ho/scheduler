import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  
  const [state, setState ] = useState({
    day: "Monday", 
    days: [],
    appointments: {}, 
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day});
  //const setDays = days => setState({ ...state, days});

  
  useEffect (() => {
    const daysURL = `http://localhost:8001/api/days`;
    const appointmentsURL = `http://localhost:8001/api/appointments`;
    const interviewersURL = `http://localhost:8001/api/interviewers`;
    
    // axios
    //   .get(daysURL)
    //   .then(response => {
      //  setDays(response.data);
     //   setState(prev => ({ ...prev, days: response.data})); //?
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((response) => {
      console.log(response);
      const daysData = (response[0].data); 
      const appointmentsData = (response[1].data); 
      const interviewersData = (response[2]); 

      setState(prev => ({
        ...prev, 
        days: daysData, 
        appointments: appointmentsData,
        interviewers : interviewersData
      })); 

    });
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day)

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
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {Object.values(dailyAppointments).map((appt) => 
          <Appointment
            key={appt.id}
            {...appt}
          />
        )}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
