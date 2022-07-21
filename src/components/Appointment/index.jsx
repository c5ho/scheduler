import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    //passing interview object 'upstream' to Application.jsx
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }
  
  const onDelete = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  }
  
  const onConfirm = () => {
    transition(CONFIRM);
  }

  const onEdit = () => {
    transition(EDIT);
  }
  
  return(
    <article className="appointment"  data-testid="appointment">
      <Header time={props.time} />
        {mode === EMPTY && (
          <Empty 
            onAdd={() => transition(CREATE)}
          />
        )}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onConfirm={onConfirm}
            onEdit={onEdit}
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === EDIT && (
          <Form 
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}  
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === CONFIRM && (
          <Confirm 
            onCancel={back}
            onConfirm={onDelete}
            message='Are you sure you want to delete?'
          />
        )}
        {mode === SAVING && (
          <Status 
            message='Saving'
          />
        )}
        {mode === DELETING && (
          <Status 
             message='Deleting'
          />
        )}
        {mode === ERROR_SAVE && (
          <Error 
            message='Unable to Save'
            onClose={back} 
          />
        )}
        {mode === ERROR_DELETE && (
          <Error 
          message='Unable to Delete'
          onClose={back} 
          />
        )}
    </article>
  )
}