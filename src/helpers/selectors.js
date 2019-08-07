function getAppointmentsForDay(state, day) {
  const resultDay = state.days.find((dayEntry) => {
    return dayEntry.name === day;
  });
  const appointmentIdArray = resultDay ? resultDay.appointments : [];
  const resultArray = [];
  appointmentIdArray.forEach((appointmentId) => {
    resultArray.push(state.appointments[appointmentId])
  })
  return resultArray;
}

function getInterview(state, interview) {
  if (interview) {
    return ({
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    })
  } else {
    return null;
  }
}

export { getAppointmentsForDay, getInterview }