import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";

export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVE);
    props.bookInterview && props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  return (
    <article className="appointment" key={props.id}>
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => mode.transition(CREATE)}/>}
        {mode === SHOW && (
          <Show 
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && 
          <Form onSave={(name, interviewer) => save(name, interviewer)} onCancel={() => back()} interviewers={props.interviewers}/>
        }
        {mode === SAVE && 
          <Status message={"Saving"} />
        }
    </article>
  )
}