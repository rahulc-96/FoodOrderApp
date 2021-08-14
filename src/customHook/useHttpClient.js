import { useState, useCallback } from "react";

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const sendRequest = useCallback(async (request, apply) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(request.url, {
        method: request.method ? request.method : "GET",
        body: request.body ? JSON.stringify(request.body) : null,
        headers: request.headers ? request.headers : {},
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      apply(data);
      setIsLoading(false);
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    isError,
    sendRequest,
  };
};

export default useHttpClient