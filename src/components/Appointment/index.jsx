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

// main Appointment component that allows appointment creation, modification, and deletion
export default function Appointment(props) {

  // use the useVisualMode custom hook to transition between different Appointment views
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

  // on save, pass student name and interviewer object and transition to SAVING view
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    // passing appointment id and interview object 'upstream' to Application, transition to SHOW view
    // on error, show ERROR SAVING view
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  // on cancel, pass appointment id up to Application, transition to DELETING view, then to EMPTY
  // on error, transition to ERROR DELETING view
  const onDelete = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  // on confirm, transition to CONFIRM view to confirm deltion
  const onConfirm = () => {
    transition(CONFIRM);
  };

  // on edit, transition to EDIT view to edit the appointment form
  const onEdit = () => {
    transition(EDIT);
  };

  // appointment views are rendered where each visual mode is true
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        
        // view that shows an available timeslot and button to create a new appointment
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}
      {mode === SHOW && (
        
        // view that shows a saved appointment with student and interviewer names in selected timeslot
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onConfirm={onConfirm}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        
        // view with input form to enter student name and select interviewer to book and appointment
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        
        // view with input form to edit existing student name and select interviewer to modify existing appointment
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        
        // view to confirm deletion of an apointment
        <Confirm
          onCancel={back}
          onConfirm={onDelete}
          message='Are you sure you want to delete this appointment?'
        />
      )}
      {mode === SAVING && (
        
        // view to show saving status
        <Status
          message='Saving'
        />
      )}
      {mode === DELETING && (
        
        // view to show deleting status
        <Status
          message='Deleting'
        />
      )}
      {mode === ERROR_SAVE && (
        
        // error view when saving is unsuccessful
        <Error
          message='Unable to Save'
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        
        // error view when deleting is unsuccessful
        <Error
          message='Unable to Delete'
          onClose={back}
        />
      )}
    </article>
  )
};