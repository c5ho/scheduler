export function getAppointmentsForDay(state, selectedDay) {

  const selectedDayArray = (state.days.filter(day => day.name === selectedDay));

  if (!selectedDayArray.length) {
    return [];
  }

  const selectedDayAppts = selectedDayArray[0].appointments  
  const arrayOfApptObjects = selectedDayAppts.map(apptId => state.appointments[apptId])

  return arrayOfApptObjects;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const selectedInterviewer = interview.interviewer;
  
  const interviewObject = {
    student: interview.student,
    interviewer: {...state.interviewers[selectedInterviewer]}
  }

  return interviewObject;
}
