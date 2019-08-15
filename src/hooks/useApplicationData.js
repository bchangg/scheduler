import { useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from 'reducers/application';

export default function useApplicationData() {
  const [state, dispatchState] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatchState({
    type: SET_DAY,
    value: day
  });

  function bookInterview(id, interview) {
    return (
      axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        dispatchState({ type: SET_INTERVIEW, id, interview })
      })
    )
  }


  function deleteInterview(id, interview) {
    return (
      axios.delete(`/api/appointments/${id}`, { interview })
      .then((response) => {
        dispatchState({ type: SET_INTERVIEW, id, interview })
      })
    )
  }

  useEffect(() => {
    Promise.all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers"),
      ])
      .then((response) => {
        dispatchState({ type: SET_APPLICATION_DATA, value: response })
      })
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}
