import React, { useState } from "react";
import classNames from "classnames";
import DropDown from "./DropDown";
import styles from "../essets/scss/Previews.module.scss";

interface PreviewsProps {
  previews: string[];
  onSelect: (index: number) => void;
  className?: string;
}

function Previews({ previews, onSelect, className }: PreviewsProps) {
  const [show, setShow] = useState(false);

  const handleShow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLLIElement;
    onSelect(eventTarget.value);
  };

  return (
    <div className={classNames(styles.container, className)}>
      <span
        className={classNames("material-symbols-rounded", styles.previewBtn)}
        onClick={handleShow}
      >
        photo_library
      </span>
      <DropDown
        show={show}
        setShow={setShow}
        variant="horiz"
        className={styles.dropdown}
      >
        <ul className={styles.previewList} onClick={handleClick}>
          {previews.map((preview, i) => (
            <li key={i} value={i}>
              <img src={preview} alt={""} />
            </li>
          ))}
        </ul>
      </DropDown>
    </div>
  );
}

export default Previews;
