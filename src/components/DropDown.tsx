import React, { useRef, useEffect, Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import styles from "../essets/scss/DropDown.module.scss";

interface DropDownProps {
  children: React.ReactNode;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

function DropDown({ children, show, setShow, className }: DropDownProps) {
  const ref = useRef<HTMLUListElement>(null);

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
  }, [show]);

  return (
    <>
      {show && (
        <ul className={classNames(styles.container, className)} ref={ref}>
          {children}
        </ul>
      )}
    </>
  );
}

export default DropDown;
