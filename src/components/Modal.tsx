import React, { useRef, useEffect, Dispatch, SetStateAction } from "react";
import Portal from "../Portal";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

function Modal({ children, show, setShow }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerNode = ref.current;
    if (!containerNode) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target === containerNode) setShow((prev) => !prev);
    };
    containerNode.addEventListener("click", handleClickOutside);
    return () => {
      containerNode.removeEventListener("click", handleClickOutside);
    };
  }, [show]);

  return (
    <Portal>
      {show && (
        <div ref={ref} className={styles.container}>
          {children}
        </div>
      )}
    </Portal>
  );
}

export default Modal;
