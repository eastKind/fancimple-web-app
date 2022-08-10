import React, { useState } from "react";
import classNames from "classnames";
import DropDown from "./DropDown";
import styles from "../essets/scss/ImgCrop.module.scss";

interface ImgCropProps {
  onCrop: (id: string) => void;
  className?: string;
}

function ImgCrop({ onCrop, className }: ImgCropProps) {
  const [show, setShow] = useState(false);

  const handleShow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLLIElement;
    onCrop(eventTarget.id);
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.cropBtn}>
        <span className={"material-symbols-rounded"} onClick={handleShow}>
          crop
        </span>
      </div>
      <DropDown show={show} setShow={setShow}>
        <ul className={styles.cropList} onClick={handleClick}>
          <li id="16/9">
            <span className="material-symbols-rounded">crop_16_9</span>
          </li>
          <li id="1/1">
            <span className="material-symbols-rounded">crop_square</span>
          </li>
          <li id="4/5">
            <span className="material-symbols-rounded">crop_portrait</span>
          </li>
        </ul>
      </DropDown>
    </div>
  );
}

export default ImgCrop;
