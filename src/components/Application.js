import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";

import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState(prevState => ({ ...prevState, day }));

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/days"),
      axios.get("http://localhost:3001/api/appointments"),
      axios.get("http://localhost:3001/api/interviewers"),
    ]).then((all) => {
      console.log(all[0].data);
      setState(state => ({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  const schedule = getAppointmentsForDay(state, state.day).map((appointmentEntry) => {
    const interview = getInterview(state, appointmentEntry.interview);
    return <Appointment key={appointmentEntry.id} {...appointmentEntry} interview={interview}/>;
  })

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
      </section>
    </main>
  );
}