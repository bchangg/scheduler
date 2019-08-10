import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

axios.defaults.baseURL = 'http://localhost:3001';

// mononoki
// bedstead
// courier prime code

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState(currentState => ({ ...currentState, day }));

  /*
    @param: NUMBER representing appointment id
    @param: OBJECT holding STUDENT/INTERVIEWER(also obj) representing the interview
  */
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

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview
    }
    const appointments = {
      ...state.appoinments,
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
      .catch((error) => {
        console.error(error);
      })
    )
  }

  const schedule = getAppointmentsForDay(state, state.day).map((appointmentEntry) => {
    const interview = getInterview(state, appointmentEntry.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      /*APPOINTMENT PROPS
        id: number
        interview: object with student and interviewer
        time
      */
      <Appointment 
        {...appointmentEntry}
        key={appointmentEntry.id}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
        editInterview={editInterview}
      />
    );
  })

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

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered"/>
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        <nav className="sidebar__menu"/>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}