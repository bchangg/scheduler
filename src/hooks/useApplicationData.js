import { useEffect, useReducer } from 'react';
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return ({
        ...state,
        day: action.value
      });
    case SET_APPLICATION_DATA:
      return ({
        ...state,
        days: action.value[0].data,
        appointments: action.value[1].data,
        interviewers: action.value[2].data
      });
    case SET_INTERVIEW:
      return ({
        ...state,
        appointments: action.value
      });
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

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
        dispatchState({ type: SET_INTERVIEW, value: appointments })
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
        dispatchState({ type: SET_INTERVIEW, value: appointments })
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
  }, [state.days])

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}
