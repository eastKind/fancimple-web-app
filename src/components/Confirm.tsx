import React, { ReactNode } from "react";
import classNames from "classnames";
import Modal from "./Modal";
import Button from "./Button";
import Spinner from "./Spinner";
import styles from "../essets/scss/Confirm.module.scss";

interface ConfirmProps {
  isOpen: boolean;
  loading: boolean;
  children: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

function Confirm({
  isOpen,
  loading,
  children,
  onCancel,
  onConfirm,
}: ConfirmProps) {
  const handleClick = (e: React.MouseEvent) => {
    const { id } = e.target as HTMLDivElement;
    if (id === "confirm") onConfirm();
    else onCancel();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span
            className={classNames("material-symbols-rounded", styles.symbol)}
          >
            warning
          </span>
          <div className={styles.texts}>{children}</div>
        </div>
        <div className={styles.btns} onClick={handleClick}>
          <Button id="confirm" className={styles.btn} disabled={loading}>
            {loading ? <Spinner size="16.8px" variant="inverse" /> : "확인"}
          </Button>
          <Button variant="inverse" className={styles.btn}>
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default Confirm;
