import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState({ currentMode: initialMode, modeHistory: [initialMode] });
  const transition = (newMode, replace = false) => {
    if (replace) {
      const currentHistory = mode.modeHistory;
      currentHistory.pop();
      setMode(modeCurrentState => ({
        ...modeCurrentState,
        currentMode: newMode,
        modeHistory: [
          ...currentHistory,
          newMode
        ]
      }))
    } else {
      setMode(modeCurrentState => ({
        ...modeCurrentState,
        currentMode: newMode,
        modeHistory: [
          ...modeCurrentState.modeHistory,
          newMode
        ]
      }))
    }
  }
  const back = () => {
    const currentHistory = mode.modeHistory;
    if (currentHistory.pop() !== initialMode) {
      setMode(modeCurrentState => ({
        ...modeCurrentState,
        currentMode: currentHistory[currentHistory.length - 1],
      }));
    }
  }
  return {
    mode: mode.currentMode,
    transition,
    back
  }
}