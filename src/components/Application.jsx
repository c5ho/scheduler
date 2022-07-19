import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  
  const [state, setState ] = useState({
    day: "Monday", 
    days: [],
    appointments: {}, 
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day});
  //const setDays = days => setState({ ...state, days});
  
  const daysURL = `http://localhost:8001/api/days/`;
  const appointmentsURL = `http://localhost:8001/api/appointments/`;
  const interviewersURL = `http://localhost:8001/api/interviewers/`;

  useEffect (() => {
    
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
      const daysData = (response[0].data); 
      const appointmentsData = (response[1].data); 
      const interviewersData = (response[2].data); 

      setState(prev => ({
        ...prev, 
        days: daysData, 
        appointments: appointmentsData,
        interviewers : interviewersData
      })); 

    });
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)

  const bookInterview = (id, interview) => {
    //copy appointment data        
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //copy appointments data
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    //returning to props.bookInterview in index.js
    return axios.put(appointmentsURL+id, {interview})
      .then(() => {
        setState((prev) => ({
          ...prev, appointments 
        }));
    })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    console.log(appointment.interview);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(appointmentsURL+id)
      .then(() => {
        setState((prev) => ({
          ...prev, appointments 
        }));
    })
  }



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
        {Object.values(dailyAppointments).map(appt => {
          return (
            <Appointment
              key={appt.id}
              {...appt}
              interview={getInterview(state, appt.interview)}
              interviewers={interviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
