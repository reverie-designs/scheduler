//DayList.js

import React from "react";
import DayListItem from "components/DayListItem"


export default function DayList(props) {

  //takes in an array of day objects and returns a day list item for each
  const printDays = props.days.map(day => {
    return (
      <DayListItem 
                  key={day.id}
                  name={day.name}
                  spots={day.spots}
                  selected={day.name === props.day}
                  setDay={props.setDay}
      />
    )
  })
  
 return printDays
}