export function getAppointmentsForDay(state, selectedDay) {
  const selectedDayObj = (state.days.find(day => day.name === selectedDay));

  if (!selectedDayObj) {
    return [];
  }

  const selectedDayAppts = selectedDayObj.appointments  
  const arrayOfApptObjects = selectedDayAppts.map(apptId => state.appointments[apptId])
  return arrayOfApptObjects;
}

export function getInterviewersForDay(state, selectedDay) {
  const selectedDayObj = (state.days.find(day => day.name === selectedDay));

  if (!selectedDayObj) {
    return [];
  }

  const selectedDayAppts = selectedDayObj.interviewers
  const arrayOfInterviewerObjects = selectedDayAppts.map(InterviewerId => state.interviewers[InterviewerId])
  return arrayOfInterviewerObjects;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const selectedInterviewer = interview.interviewer;
  const interviewObject = {
    ...interview,
    interviewer: {...state.interviewers[selectedInterviewer]}
  }
  return interviewObject;
}

export function getUpdatedSpotsForDay(state, appointments) {
    
    const currentDayIndex = state.days.findIndex((day) => day.name === state.day);
    
    const currentDay = state.days[currentDayIndex];
    
    //show appointment IDs where interview is nulll in an array; length of array is number of spots 
    const spots = currentDay.appointments.filter((id) => !appointments[id].interview).length;
  
    const updatedDayObj = { ...currentDay, spots };
  
    const updatedDaysArr = [...state.days];
    updatedDaysArr[currentDayIndex] = updatedDayObj;
  
    return updatedDaysArr;
  };


