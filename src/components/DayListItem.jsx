import React from 'react';
import classNames from "classnames";
import "components/DayListItem.scss";

//move formatSpots out of DayListItem fn and pass in spots are parameter to make it a 'pure' fn
const formatSpots = (numberOfSpots) => {
  if (numberOfSpots > 1) {
    return`${numberOfSpots} spots remaining`;
  }
  if (numberOfSpots === 1) {
    return '1 spot remaining';
  }
  return 'no spots remaining';
}

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.spots === 0
  });
  
  return (
    //li represents the entire day item, h2 displays the day name, h3 displays the spots remaining
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
