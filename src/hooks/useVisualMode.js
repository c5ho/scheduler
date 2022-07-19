import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    console.log("before:", history, mode, replace);
    if (replace) {
      const temp = [...history];
      temp.pop();
      setHistory(temp)
      console.log("if replace is true:", history)
    }
    setMode(mode)
    //setHistory([...history, mode])
    //console.log("after:", history, mode, replace);
    setHistory((prev) => {
      console.log("after:", [...prev, mode])
      return [...prev, mode]
    })
  }

  function back () {
    if (history.length > 1) {
      console.log(history, mode);
      setMode(history[history.length - 2]);
      const temp = [...history];
      temp.pop();
      setHistory(temp)
    }
  }
  return { mode, transition, back };
}