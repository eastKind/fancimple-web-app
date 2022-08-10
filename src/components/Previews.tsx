import React, { useState, useEffect } from "react";
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
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(previews.length > 4);
  const [figure, setFigure] = useState(0);

  const style = { transform: `translateX(${figure}px)` };

  const handleShow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(true);
  };

  const handleClickPreview = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLLIElement;
    onSelect(eventTarget.value);
  };

  const handleClickArrow = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLSpanElement;
    const nextFigure = eventTarget.id ? 425 - previews.length * 100 : 0;
    setFigure(nextFigure);
  };

  useEffect(() => {
    if (previews.length < 5) return;
    if (figure) {
      setHasLeft(true);
      setHasRight(false);
    } else {
      setHasLeft(false);
      setHasRight(true);
    }
  }, [figure, previews.length]);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.previewBtn}>
        <span className={"material-symbols-rounded"} onClick={handleShow}>
          photo_library
        </span>
      </div>
      <DropDown show={show} setShow={setShow}>
        <div className={styles.slide}>
          <ul
            className={styles.previewList}
            onClick={handleClickPreview}
            style={style}
          >
            {previews.map((preview, i) => (
              <li key={i} value={i}>
                <img src={preview} alt={""} />
              </li>
            ))}
          </ul>
          {hasLeft && (
            <span
              onClick={handleClickArrow}
              className={classNames(
                styles.arrow,
                styles.left,
                "material-symbols-rounded"
              )}
            >
              chevron_left
            </span>
          )}
          {hasRight && (
            <span
              id="right"
              onClick={handleClickArrow}
              className={classNames(
                styles.arrow,
                styles.right,
                "material-symbols-rounded"
              )}
            >
              chevron_right
            </span>
          )}
        </div>
      </DropDown>
    </div>
  );
}

export default Previews;
