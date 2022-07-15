import React from 'react';
import DayListItem from "components/DayListItem";


export default function DayList(props) {

//Using a for loop:
  //const day = props.day;
  // const dayListItemArr = [];
  // for (const day of props.days) {
  //   dayListItemArr.push(
  //     <DayListItem 
  //     key={day.id}
  //     name={day.name} 
  //     spots={day.spots} 
  //     selected={day.name === props.day}
  //     setDay={props.setDay}  
  //     />
  //   )
  // }

//Using map with an array declaration
  // const dayListItemArr =  props.days.map((day) => {
  //   return(
  //     <DayListItem 
  //       key={day.id}
  //       name={day.name} 
  //       spots={day.spots} 
  //       selected={day.name === props.day}
  //       setDay={props.setDay}  
  //     />
  //   );
  // })
  // return (
  //   <ul>
  //     { dayListItemArr }
  //   </ul>
  // );
  
  
//Can also return array directly
    return (
      <ul>
        {props.days.map((day) => 
          <DayListItem 
            key={day.id}
            name={day.name} 
            spots={day.spots} 
            selected={day.name === props.value}
            setDay={props.onChange}  
          />
        )}
      </ul>
    );
  }