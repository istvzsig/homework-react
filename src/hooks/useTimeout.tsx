import { useState } from "react";

const useTimeout = (initialValue: boolean = false) => {
  const [timeoutStarted, setTimeoutStarted] = useState<boolean>(initialValue);

  return {
    timeoutStarted,
    setTimeoutStarted,
  };
};

export default useTimeout;
