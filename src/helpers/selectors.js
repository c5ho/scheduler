export function getAppointmentsForDay(state, selectedDay) {

  const selectedDayArray = (state.days.filter(day => day.name === selectedDay));

  if (!selectedDayArray.length) {
    return [];
  }

  const selectedDayAppts = selectedDayArray[0].appointments  
  const arrayOfApptObjects = selectedDayAppts.map(apptId => state.appointments[apptId])

  // selectedDayAppts.forEach(apptId => state.appointments[apptId] && result.push(state.appointments[apptId]))


  return arrayOfApptObjects;
}

