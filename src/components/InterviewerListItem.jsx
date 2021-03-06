import React from 'react';
import classNames from "classnames";
import "components/InterviewerListItem.scss";

// component that shows a selected interviewer in the book interview form
export default function InterviewerListItem(props) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })

  return (
    // After prop-drilling, function setInterviewer executes in InterviewerList and here called only as a reference
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
};
