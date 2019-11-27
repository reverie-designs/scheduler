import DayList from "components/DayList";

// import React from "react";


export function getAppointmentsForDay(state, day) {
    const filteredAppointments = state.days.filter(specDay => specDay.name === day);
    if (filteredAppointments.length === 0 || state.days === undefined || state.days.length === 0){
      return [];
    } else {
      let thisDayApps = filteredAppointments[0].appointments;
      const results =[];
      thisDayApps.forEach(app => results.push(state.appointments[`${app}`]))
      return results;
    }
};

