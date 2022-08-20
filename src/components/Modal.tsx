import React, { useRef, useEffect } from "react";
import Portal from "../Portal";
import styles from "../essets/scss/Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: ModalProps) {
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
        <div ref={ref} className={styles.container}>
          {children}
        </div>
      )}
    </Portal>
  );
}

export default Modal;
