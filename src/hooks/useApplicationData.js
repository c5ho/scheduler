import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUpdatedSpotsForDay } from "helpers/selectors";

export default function useApplicationData() {

  const [state, setState ] = useState({
    day: "Monday", 
    days: [],
    appointments: {}, 
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day});

  const appointmentsURL = `/api/appointments/`;
  const interviewersURL = `/api/interviewers/`;
  const daysURL = `/api/days/`;
  
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
  }, [daysURL, appointmentsURL, interviewersURL])

  const bookInterview = (id, interview) => {
    //build data structure with new interview data
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    //returning to props.bookInterview in index.js
    return axios.put(appointmentsURL+id, {interview})
      .then(() => {
        
        //get updated remaining spots for day based on new appointments data
        const updatedDays = (getUpdatedSpotsForDay(state, appointments));
        
        //set updated state with new appointments and days data
        setState((prev) => ({
          ...prev, appointments,
          days: updatedDays
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
        const updatedDays = (getUpdatedSpotsForDay(state, appointments));
        setState((prev) => ({
          ...prev, appointments,
          days: updatedDays 
        }));
      })
  }
  return { state, setDay, bookInterview, cancelInterview };
}