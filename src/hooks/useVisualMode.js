import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  // eslint-disable-next-line
  const [history, setHistory] = useState([initialMode]);

  const back = () => {
    setHistory((currentHistory) => {
      if (currentHistory[currentHistory.length - 1] !== initialMode) {
        setMode(currentHistory[currentHistory.length - 2]);
        currentHistory.pop();
        return currentHistory;
      } else {
        setMode(currentHistory[currentHistory.length - 1]);
      }
      return currentHistory;
    })
  }

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((currentHistory) => {
        currentHistory.pop();
        return [...currentHistory, newMode];
      })
    } else {
      setHistory((currentHistory) => {
        return [...currentHistory, newMode];
      })
    }
    setMode(newMode);
  }

  return {
    mode,
    transition,
    back
  }
}
