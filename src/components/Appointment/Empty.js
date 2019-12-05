// Empty.js

import React from "react"

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        data-testid="empty-slot"
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  )
}