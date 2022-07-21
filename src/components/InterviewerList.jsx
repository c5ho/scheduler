import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss";

// component that shows the list of interviewers to choose from to book
export default function InterviewerList(props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) =>
          <InterviewerListItem

            // interviewer id needed as InterviewerListItem uses the id for setInterviewer(props.id)
            key={interviewer.id}

            name={interviewer.name}
            avatar={interviewer.avatar}

            // interviewer selected is passed in as an id called "interviewer" hence, must compare interviwer.id to props.interviewer
            selected={interviewer.id === props.selectedInterviewerId}

            // callback fn to trigger props.onChange when onClick occurs in InterviewListItem
            setInterviewer={() => props.onChange(interviewer.id)}
          />
        )}
      </ul>
    </section>
  )
};