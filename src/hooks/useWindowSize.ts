import { useState, useEffect } from "react";
import _ from "lodash-es";

function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = _.throttle(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 500);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height };
}

export default useWindowSize;
