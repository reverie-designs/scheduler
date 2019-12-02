import React from "react"
import PropTypes from 'prop-types'
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem"


//============ prop-type test ============//
InterviewerList.propTypes = {
 value: PropTypes.number,
 onChange: PropTypes.func.isRequired
};
//========== end prop-type test ===========//

export default function InterviewerList(props) {

  let interviewers = Object.values(props.interviewers)

  // returns available interviewers for specific day
  const printsInterviewers = interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event=> props.onChange(interviewer.id)}
      />
    )
  })

 return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewers</h4>
    <ul className="interviewers__list">
        {printsInterviewers}
    </ul>
  </section>
 )
}