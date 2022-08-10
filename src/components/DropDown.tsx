import React, { useRef, useEffect, Dispatch, SetStateAction } from "react";

interface DropDownProps {
  children: React.ReactNode;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

function DropDown({ children, show, setShow }: DropDownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropNode = ref.current;
    if (!dropNode) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!dropNode.contains(e.target as Node)) setShow(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [show, setShow]);

  return <div ref={ref}>{show && children}</div>;
}

export default DropDown;
