import { useState } from "react";

const useInteractionTime = (initialTime: number = Date.now()) => {
  const [lastInteractionTime, setLastInteractionTime] =
    useState<number>(initialTime);

  return {
    lastInteractionTime,
    setLastInteractionTime,
  };
};

export default useInteractionTime;
