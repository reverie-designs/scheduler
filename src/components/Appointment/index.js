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
const EDIT = "EDIT";

export default function Appointment({id, time, interviewers, interview, bookInterview, deleteInterview}) {

  const {mode, transition, back} = useVisualMode( interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer: interviewer
    };

    bookInterview(id, interview)
    .then(()=>transition(SHOW));
  };

  const deleting = () => {
    transition(CONFIRM);
  };

  const confirmDelete = () => {
    transition(DELETING);
    deleteInterview(id)
      .then(()=> transition(EMPTY));
  };

  return (
  <article className="appointment">
    <Header time={time}/>
    {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}
    {mode === SHOW && (
          <Show 
            student = {interview.student}
            interviewer = {interview.interviewer}
            onDelete = {deleting}
            onEdit = {()=>transition(EDIT)}
          />
    )}
    {mode === CREATE && (
          <Form interviewers = {interviewers} onSave = {save} onCancel = {back} 
          />
    )}
    {mode === SAVING && <Status message={"Saving"}/>}
    {mode === CONFIRM && 
          <Confirm onCancel = {back} onConfirm = {confirmDelete}
                   message={"Are you sure you wish to delete this appointment?"}
          />
    }
    {mode === DELETING && <Status message={"Deleting"}/>}
    {mode === EDIT && 
          <Form interviewers = {interviewers} name = {interview.student} 
                interviewer = {interview.interviewer.id} onCancel ={back} onSave={save}
          />
    }
  </article>
  );
}