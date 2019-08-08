import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const mode = useVisualMode(props.interview ? SHOW : EMPTY);
  
  return (
    <article className="appointment" key={props.id}>
      <Header time={props.time}/>
        {mode.mode === EMPTY && <Empty onAdd={() => mode.transition(CREATE)}/>}
        {mode.mode === SHOW && (
          <Show 
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode.mode === CREATE && <Form onCancel={() => mode.back()} interviewers={props.interviewers}/>}
    </article>
  )
}

// {props.interview ? 
//   <Show 
//     student={props.interview.student}
//     interviewer={props.interview.interviewer}
//   /> : <Empty />}