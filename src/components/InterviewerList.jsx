import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) =>
          <InterviewerListItem
            key={interviewer.id}
            // we need the interviewer id as InterviewerListItem uses the id for setInterviewer(props.id)
            // After prop-drilling, no longer need to pass down interviewer.id as prop
            // id={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            // interviewer selected is passed in as an id called "interviewer" hence, must compare interviwer.id to props.interviewer
            selected={interviewer.id === props.interviewer} 
            // After prop-drilling setting the setInterviewer function instead of passing only a reference
            // setInterviewer={props.setInterviewer}
            setInterviewer={() => props.setInterviewer(interviewer.id)}
          />
        )}
      </ul>
    </section>
  );
}