import React, { useRef, Dispatch, SetStateAction, useEffect } from "react";

interface DropDownProps {
  children: React.ReactNode;
  isDropped: boolean;
  setDrop: Dispatch<SetStateAction<boolean>>;
}

function DropDown({ children, isDropped, setDrop }: DropDownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const dropNode = ref.current;

    const handleClick = (e: MouseEvent) => {
      if (!dropNode.contains(e.target as Node)) setDrop(false);
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isDropped, setDrop]);

  return <div ref={ref}>{isDropped && children}</div>;
}

export default DropDown;
