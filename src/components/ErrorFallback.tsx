import React from "react";

interface ErrorProps {
  error: Error | null;
}

function ErrorFallback({ error }: ErrorProps) {
  return <div>{error?.message}</div>;
}

export default ErrorFallback;
