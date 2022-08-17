import React, { Dispatch, ReactNode, SetStateAction } from "react";
import classNames from "classnames";
import Modal from "./Modal";
import Button from "./Button";
import styles from "../essets/scss/Confirm.module.scss";

interface ConfirmProps {
  show: boolean;
  children: ReactNode;
  setShow: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}

function Confirm({ show, children, setShow, onConfirm }: ConfirmProps) {
  const handleClick = (e: React.MouseEvent) => {
    const { id } = e.target as HTMLDivElement;
    if (id === "confirm") onConfirm();
    else setShow(false);
  };

  return (
    <Modal show={show} setShow={setShow}>
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
          <Button id="confirm" className={styles.btn}>
            확인
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
