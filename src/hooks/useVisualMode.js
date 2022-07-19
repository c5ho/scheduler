import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    console.log("before setMode:", history, "pending state:", mode, replace);
    if (replace) {
      setHistory(prev => {
        console.log(prev);
        return [...prev.slice(0, -1), mode];
      })
      console.log("if replace is true:", history)
      return setMode(mode)
    }
    setMode(mode)

    setHistory((prev) => {
      console.log("after setMode:", [...prev, mode])
      return [...prev, mode]
    })
  }

  function back () {
    if (history.length > 1) {
      console.log(history, mode);
      setMode(history[history.length - 2]);
      return setHistory(prev => [...prev.slice(0, -1)])
    }
  }
  return { mode, transition, back };
}