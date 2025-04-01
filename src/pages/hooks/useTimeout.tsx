import { useEffect, useState } from "react";

const TIMEOUT_DELAY_SEC = 5000;

const useTimeout = (
  callback: () => void,
  delay: number = TIMEOUT_DELAY_SEC
) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeout = setTimeout(() => {
      callback();
    }, delay);

    setTimeoutId(newTimeout);

    return () => clearTimeout(newTimeout);
  }, [callback, timeoutId]);
};

export default useTimeout;
