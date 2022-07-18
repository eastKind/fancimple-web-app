import React, { useRef, useState, useEffect, useCallback } from "react";

function useInfiniteScroll(targetRef: React.MutableRefObject<any>) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<any>(null);

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        setIsIntersecting(entries.some((entry) => entry.isIntersecting));
      });
    }
    return observerRef.current;
  }, [observerRef]);

  useEffect(() => {
    if (targetRef.current) getObserver().observe(targetRef.current);

    return () => {
      getObserver().disconnect();
    };
  }, [getObserver, targetRef]);

  return isIntersecting;
}

export default useInfiniteScroll;
