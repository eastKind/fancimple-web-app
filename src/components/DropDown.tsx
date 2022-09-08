import React, { useRef, Dispatch, SetStateAction, useEffect } from "react";
import classNames from "classnames";
import styles from "../essets/scss/Dropdown.module.scss";

interface DropDownProps {
  children: React.ReactNode;
  isDropped: boolean;
  setDrop: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

function DropDown({ children, isDropped, setDrop, className }: DropDownProps) {
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

  return (
    <div ref={ref} className={classNames(styles.container, className)}>
      {isDropped && children}
    </div>
  );
}

export default DropDown;
