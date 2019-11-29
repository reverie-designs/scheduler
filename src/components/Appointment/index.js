import React, { useEffect } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  console.log("THESE ARE APPOINTMENT PROPS", props);
  console.log(props.id);
  const {mode, transition, back} = useVisualMode( props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer: interviewer
    };

    props.bookInterview(props.id, interview)
    .then(()=>transition(SHOW));
  };

  const deleting = () => {
    transition(CONFIRM);
  };

  const confirmDelete = () => {
    transition(DELETING);
    props.deleteInterview(props.id)
      .then(()=> transition(EMPTY));
  };

  // useEffect() => 
  // const edit =() =>{
  //   transition(CREATE, {student, interviewer});
  //   props.bookInterview(props.id, interview)
  // }

  return (
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}
    {mode === SHOW && (
      <Show 
        student = {props.interview.student}
        interviewer = {props.interview.interviewer}
        onDelete = {deleting}
        // onEdit = {edit}
      />
    )}
    {mode === CREATE && (
      <Form interviewers = {props.interviewers} onSave = {save} onCancel = {back} 
      />
    )}
    {mode === SAVING && <Status message={"Saving"}/>}
    {mode === CONFIRM && <Confirm onCancel = {back} onConfirm = {confirmDelete}
      message={"Are you sure you wish to delete this appointment?"}
      
    />}
    {mode === DELETING && <Status message={"Deleting"}/>}

  </article>
  );
}