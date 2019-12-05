//selectors.js

//gets database access through state and selected day
//returns all filled or available appointments for the day
export function getAppointmentsForDay(state, day) {
    const filteredAppointments = state.days.filter(specDay => specDay.name === day)
    if (filteredAppointments.length === 0 || state.days === undefined || state.days.length === 0){
      return []
    } else {
      let thisDayApps = filteredAppointments[0].appointments
      const results =[]
      thisDayApps.forEach(app => results.push(state.appointments[`${app}`]))
      return results
    }
}


//gets database access through state and selected day
//returns filled interviews
export function getInterview(state, interview) {
  
  if (interview) {
    let student = interview.student
    let id = interview.interviewer
    let result = {}

    if (state.appointments[id]){
      result.student = student
      result.interviewer = state.interviewers[id]
      return result
    } 

  } else {
      return null
  }

}

//gets the full database through state, and selected day
//returns available interviewers for the specific day
export function getInterviewersForDay(state, day) {
    
  //reuturns on object for that day
    const filteredInterviewers = state.days.filter(specDay => specDay.name === day);

    if (
        filteredInterviewers.length === 0 || 
        state.days === undefined || 
        state.days.length === 0 || 
        state.interviewers.length === 0 || 
        !filteredInterviewers[0].interviewers
      ) {
          return [];
    } else {
          let thisDayInterviewers = filteredInterviewers[0].interviewers;
          const results =[];
          thisDayInterviewers.forEach(interv => results.push(state.interviewers[`${interv}`]))
          return results;
    }
};
