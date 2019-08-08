import React from "react";

import DayListItem from "components/DayListItem"


/* props
days: Array - a list of day objects
day: String - the currently selected day
setDay: Function - accepts the name of the day
*/

export default function DayList(props) {
  return (
    <ul>
      {props.days.map((day) => {
        return (
          <DayListItem
            key={day.id}
            selected={day.name === props.day}
            name={day.name}
            spots={day.spots}
            setDay={() => {
              return props.setDay(day.name)
            }}
          />
        )
      })}
    </ul>
  );
}