import React, {useState} from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false){
    if(!replace){
      setMode(newMode);
      setHistory(history=> [mode, ...history]);
    }
    setMode(newMode);
  }

  function back (){
    if (history.length === 1) {
      setHistory(initial);
      setMode(mode);
    } else {
      // let newHistory = [...history];
      // newHistory.splice(newHistory.length-1, 1);
      // setHistory(history => history.slice(1));
      setHistory(([ _ ,...history])=> history);
      setMode(history[0]);
    }   
  }
  return {mode, transition, back};
};

