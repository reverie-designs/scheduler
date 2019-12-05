//DayListItem.js

import React from "react"
import "components/DayListItem.scss"
import classnames from "classnames"


export default function DayListItem({name, spots, selected, setDay}) {
  let dayClass=classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  })

  //manages the string that showcases how many spots are remaining for each day
  const formatSpots = (spots) => {
    return spots === 0 ? "no spots remaining" 
         : spots === 1 ? `${spots} spot remaining`
         : `${spots} spots remaining`;
  }
  
  return (
          <li onClick={() => setDay(name)}
            className={dayClass}
            data-testid="day"
          >
            <h2 className="text--regular">{name}</h2> 
            <h3 className="text--light">{formatSpots(spots)}</h3>
          </li>
  )
}