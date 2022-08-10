import React, { useRef, useEffect, Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import styles from "../essets/scss/DropDown.module.scss";

interface DropDownProps {
  children: React.ReactNode;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  variant?: "horiz";
  className?: string;
}

function DropDown({
  children,
  show,
  setShow,
  variant,
  className,
}: DropDownProps) {
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

  return (
    <div
      className={classNames(
        styles.container,
        variant && styles[variant],
        className
      )}
      ref={ref}
    >
      {show && children}
    </div>
  );
}

export default DropDown;
