import React from "react";

import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';

/*props
id: number
time: string
interview: object with keys "student" and "interviewer"
*/

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) => {
          return <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={props.value === interviewer.id}
            setInterviewer={() => {
              props.onChange(interviewer.id);
            }}
          />
        })}
      </ul>
    </section>
  );
}