import React, { useEffect, useRef, ReactNode } from "react";
import classNames from "classnames";
import Portal from "../Portal";
import styles from "../essets/scss/Offcanvas.module.scss";

interface OffcanvasProps {
  children: ReactNode;
  direction: "left" | "right";
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

function Offcanvas({
  children,
  isOpen,
  onClose,
  direction,
  className,
}: OffcanvasProps) {
  const ref = useRef<HTMLDivElement>(null);

  const style = {
    [direction]: 0,
    width: isOpen ? "100%" : "0",
  };

  useEffect(() => {
    const containerNode = ref.current;
    if (!containerNode) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target === containerNode) onClose();
    };
    containerNode.addEventListener("click", handleClickOutside);
    document.body.style.overflowY = "hidden";
    return () => {
      containerNode.removeEventListener("click", handleClickOutside);
      document.body.style.overflowY = "scroll";
    };
  }, [isOpen, onClose]);

  return (
    <Portal>
      {isOpen && <div className={styles.bg} ref={ref} />}
      <div className={classNames(styles.container, className)} style={style}>
        {children}
      </div>
    </Portal>
  );
}

export default Offcanvas;
