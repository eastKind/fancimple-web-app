import { useState, useEffect } from "react";
import throttle from "lodash-es/throttle";

function useWindowSize() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = throttle(() => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    }, 500);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { innerWidth, innerHeight };
}

export default useWindowSize;
