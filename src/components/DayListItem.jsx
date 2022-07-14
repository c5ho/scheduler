import React from 'react';
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.spots === 0
  });
  
  const formatSpots = () => {
    if (props.spots > 1) {
      return`${props.spots} spots remaining`;
    }
    if (props.spots === 1) {
      return '1 spot remaining';
    }
    return 'no spots remaining';
  }
  
  
  return (
    //li represents the entire day item, h2 displays the day name, h3 displays the spots remaining
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
