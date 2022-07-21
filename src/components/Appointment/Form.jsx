import React, { useState } from "react";
import Button from "../Button"
import InterviewerList from "../InterviewerList";

// form view where user can enter name, select interviewer and save appointment in chosen time slot
export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // on Cancel, reset the input form
  const reset = () => {
    setStudent("");
    setInterviewer(null);

    // resets error message to blank after resetting input form
    setError("");
  };

  // when user selects cancel on the input form
  const cancel = () => {
    reset();
    props.onCancel();
  };

  //new appointment form input validation
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    };
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    };
    // when user selects save after filling out input form
    props.onSave(student, interviewer);

    //resets error message to blank after successful appointment save
    setError("");
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"

          // prevent the default form submission on "enter"
          onSubmit={(event) => event.preventDefault()}>

          <input data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}

            //setStudent set student as a starting value or blank if student name does not exist
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>

        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          selectedInterviewerId={interviewer}
          onChange={setInterviewer}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}