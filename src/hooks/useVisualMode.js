import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {

    // if the previous view needs to be skipped
    if (replace) {
      setHistory(prev => {
        
        //remove last view from history before adding next pending view
        return [...prev.slice(0, -1), mode];
      })
      return setMode(mode)
    };

    // if previous view does not need replacing, set next view and add view to history
    setMode(mode)
    setHistory((prev) => {
    return [...prev, mode]
    })
  };

  function back () {
    
    // check to make sure can only move backwards if there is a state to go back to
    if (history.length > 1) {
      
      //setMode to previous view in history
      setMode(history[history.length - 2]);
      
      //remove last view from history
      return setHistory(prev => [...prev.slice(0, -1)])
    };
  };
  return { mode, transition, back };
};