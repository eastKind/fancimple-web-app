import React, { useRef, useEffect } from "react";
import Portal from "../Portal";
import classNames from "classnames";
import styles from "../essets/scss/Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

function Modal({ children, isOpen, onClose, className }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

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
      {isOpen && (
        <div ref={ref} className={classNames(styles.container, className)}>
          {children}
          <span
            className={classNames("material-symbols-rounded", styles.symbol)}
            onClick={() => onClose()}
          >
            close
          </span>
        </div>
      )}
    </Portal>
  );
}

export default Modal;
