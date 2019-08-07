import React, { useState } from "react";
import classnames from 'classnames';

import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';

/*props
id: number
time: string
interview: object with keys "student" and "interviewer"
*/

export default function InterviewerList(props) {
  return (
    <section class="interviewers">
      <h4 class="interviewers__header text--light">Interviewer</h4>
      <ul class="interviewers__list">
        {props.interviewers.map((interviewer) => {
          return <InterviewerListItem
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