import React from 'react';

export default function DayListItem(props) {
  return (
    //li represents the entire day item, h2 displays the day name, h3 displays the spots remaining
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} sports remaining</h3>
    </li>
  );
}