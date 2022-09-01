import React, { useState, useCallback } from "react";
import type { Error } from "../types";

interface AsyncFunction {
  (reqData: any): Promise<any>;
}

function useAsync(
  asyncFunction: AsyncFunction
): [loading: boolean, error: Error | null, wrappedFunction: AsyncFunction] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const wrappedFunction = useCallback(
    async (reqData: any) => {
      try {
        setLoading(true);
        setError(null);
        return await asyncFunction(reqData);
      } catch (error: any) {
        const { status, data } = error.response;
        setError({ status, data });
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  return [loading, error, wrappedFunction];
}

export default useAsync;
