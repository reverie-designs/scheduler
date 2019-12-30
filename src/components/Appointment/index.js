//index.js
// eslint-disable-next-line
import React, {useEffect} from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "../../hooks/useVisualMode"


const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"
const ERROR_INTREVIEW = "ERROR_INTREVIEW"

//error msgs
const message = {
                    save: "Saving",
                    delete: "Deleting",
                    saveError: "Couldn't Save. Please try again later.",
                    deleteError: "Couldn't Delete. Please try again later.",
                    confirm: "Are you sure you wish to delete this appointment?",
                    interviewer: "Please select an interviewer"
}

export default function Appointment({id, time, interviewers, interview, bookInterview, deleteInterview}) {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);


  const validate = (name, interviewer) => {
    !interviewer ? transition(ERROR_INTREVIEW, true) : save(name, interviewer);
  }
  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer: interviewer
    }

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => {transition(ERROR_SAVE, true)})
  }

  const deleting = () => {
    transition(CONFIRM);
  }

  const confirmDelete = () => {
    transition(DELETING, true)
    deleteInterview(id)
      .then(()=> transition(EMPTY))
      .catch(() => {transition(ERROR_DELETE, true)})     
  }
 

  useEffect(() => {
    if (interview && mode === EMPTY) {
     transition(SHOW)
    }
    if (interview === null && mode === SHOW) {
     transition(EMPTY)
    }
   }, [interview, transition, mode])

  return (
            <article className="appointment" data-testid="appointment">
              
              <Header time={time}/>

              {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}

              {mode === SHOW && interview && (
                    <Show 
                      student = {interview.student}
                      interviewer = {interview.interviewer}
                      onDelete = {deleting}
                      onEdit = {()=>transition(EDIT)}
                    />
              )}

              {mode === CREATE && (
                    <Form interviewers = {interviewers} onSave = {validate} onCancel = {back} 
                    />
              )}

              {mode === SAVING && <Status message={message.save}/>}

              {mode === CONFIRM && 
                    <Confirm 
                            onCancel = {back} 
                            onConfirm = {confirmDelete}
                            message={message.confirm}
                    />
              }

              {mode === DELETING && <Status message={message.delete}/>}

              {mode === EDIT && 
                    <Form 
                          interviewers = {interviewers} 
                          name = {interview.student} 
                          interviewer = {interview.interviewer.id} 
                          onCancel = {back} onSave = {save}
                    />
              }

              {mode === ERROR_SAVE && <Error message={message.saveError} onClose = {back}/>}

              {mode === ERROR_DELETE && <Error message={message.deleteError} onClose = {back}/>}
              {mode === ERROR_INTREVIEW && <Error message={message.interviewer} onClose = {back}/>}
              
            </article>
  )
}