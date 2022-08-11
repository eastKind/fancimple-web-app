import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import DropDown from "./DropDown";
import styles from "../essets/scss/PreviewList.module.scss";
import PreviewItem from "./PreviewItem";

interface PreviewListProps {
  previews: string[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  className?: string;
}

function PreviewList({
  previews,
  index,
  setIndex,
  className,
}: PreviewListProps) {
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
    setIndex(eventTarget.value);
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
              <PreviewItem
                key={i}
                preview={preview}
                value={i}
                isSelected={i === index}
              />
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

export default PreviewList;
