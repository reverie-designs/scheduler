import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";

export default function InterviewerListItem(props) {
  let interviwersClass=classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={interviwersClass} onClick={()=> props.setInterviewer(props.id)}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.name}
  </li>
  );
}