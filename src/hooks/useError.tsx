import { useState } from "react";
import { ApiError } from "@/models/apiError.model";

const useError = () => {
  const [error, setError] = useState<ApiError | null>(null);

  return {
    error,
    setError,
  };
};

export default useError;
