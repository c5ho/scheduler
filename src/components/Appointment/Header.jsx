import React from "react";

// header with Interview Scheduler name and logo
export default function Header(props) {
  return (
    <header className="appointment_time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appiontment__separator" />
    </header>
  )
};