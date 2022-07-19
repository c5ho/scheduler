import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState ] = useState({
    day: "Monday", 
    days: [],
    appointments: {}, 
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day});

  const appointmentsURL = `http://localhost:8001/api/appointments/`;
  const interviewersURL = `http://localhost:8001/api/interviewers/`;
  const daysURL = `http://localhost:8001/api/days/`;
  
  useEffect (() => {
    
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
  return { state, setDay, bookInterview, cancelInterview };
}