function getAppointmentsForDay( state, day ) {
  const resultDay = getDay( state, day );
  const appointmentIdArray = resultDay ? resultDay.appointments : [];
  const resultArray = [];
  appointmentIdArray.forEach( appointmentId => {
    resultArray.push( state.appointments[ appointmentId ] );
  } );
  return resultArray;
}

function getDay( state, day ) {
  return state.days.find( dayEntry => dayEntry.name === day );
}

function getSpotsForDay( state, dayName ) {
  return state.days
    .find( day => {
      return day.name === dayName;
    } )
    .appointments.filter( appointment => {
      return state.appointments[ appointment ].interview === null;
    } ).length;
}

function getInterview( state, interview ) {
  if ( interview ) {
    return {
      student: interview.student,
      interviewer: state.interviewers[ interview.interviewer ]
    };
  } else {
    return null;
  }
}

function getInterviewersForDay( state, day ) {
  const resultDay = getDay( state, day );
  const interviewersArray = resultDay ? resultDay.interviewers : [];
  const resultArray = [];
  interviewersArray.forEach( interviewersKey => {
    resultArray.push( state.interviewers[ interviewersKey ] );
  } );
  return resultArray;
}

export {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
  getSpotsForDay
};
