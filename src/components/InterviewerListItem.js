import React from "react";
import classnames from 'classnames';

import 'components/InterviewerListItem.scss';

/* props
selected: boolean
name: string
avatar: string for a url
id: number value
*/

export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li key={props.id} className={interviewerClass} onClick={props.setInterviewer}>
      <img 
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}