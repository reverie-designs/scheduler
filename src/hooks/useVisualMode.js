//useVisualMode.js
// eslint-disable-next-line 
import React, {useState} from "react";

//manages the visual rendering and visual state of 
//booking an appointment
export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false){
    if(!replace){
      setMode(newMode);
      setHistory(history=> [mode, ...history]);
    }
    setMode(newMode);
  };

  function back (){
    if (history.length === 1) {
      setHistory(initial);
      setMode(mode);
    } else {
      setHistory(([ _ ,...history])=> history);
      setMode(history[0]);
    }   
  };
  return {mode, transition, back}
}
