import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return (

      );
    case SET_APPLICATION_DATA:
      return (

      );
    case SET_INTERVIEW:
      return (

      );
    default:

  }

}

export default function useApplicationData() {
  const [state, dispatchState] = useReducer()

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState(currentState => ({ ...currentState, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return (
      axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState((currentState) => {
          return {
            ...currentState,
            appointments
          }
        })
      })
    )
  }

  function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return (
      axios.delete(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState((currentState) => {
          return {
            ...currentState,
            appointments
          }
        })
      })
    )
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      setState(currentState => ({
        ...currentState,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }));
    })
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}
