import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import DropDown from "./DropDown";
import styles from "../essets/scss/PreviewList.module.scss";
import PreviewItem from "./PreviewItem";

interface PreviewListProps {
  previews: string[];
  setPreviews: Dispatch<SetStateAction<string[]>>;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  onChange: (files: FileList) => void;
  onDelete: (index: number) => void;
  className?: string;
}

function PreviewList({
  previews,
  setPreviews,
  index,
  setIndex,
  onChange,
  onDelete,
  className,
}: PreviewListProps) {
  const [show, setShow] = useState(false);
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(false);
  const [figure, setFigure] = useState(0);
  const END = 400 - previews.length * 100;
  const START = 0;

  const style = {
    transform: `translateX(${figure}px)`,
  };

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    setPreviews((prev) => {
      const next = [...prev];
      next.splice(dragIndex, 1);
      next.splice(hoverIndex, 0, prev[dragIndex]);
      return next;
    });
    setIndex(hoverIndex);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = e.target.files;
    if (nextFiles) onChange(nextFiles);
  };

  const handleDelete = (index: number) => {
    setFigure(0);
    onDelete(index);
  };

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
    setFigure((prev) => {
      const next = eventTarget.id
        ? prev - 300 < END
          ? END
          : prev - 300
        : prev + 300 > START
        ? START
        : prev + 300;
      console.log(prev, next);
      return next;
    });
  };

  useEffect(() => {
    if (figure < START) setHasLeft(true);
    else setHasLeft(false);
    if (figure > END) setHasRight(true);
    else setHasRight(false);
  }, [figure, END]);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.previewBtn}>
        <span className={"material-symbols-rounded"} onClick={handleShow}>
          photo_library
        </span>
      </div>
      <DropDown show={show} setShow={setShow}>
        <div className={styles.slideContainer}>
          <div className={styles.slide}>
            <ul
              className={styles.previewList}
              onMouseDown={handleClickPreview}
              style={style}
            >
              {previews.map((preview, i) => (
                <PreviewItem
                  key={i}
                  preview={preview}
                  index={i}
                  isSelected={i === index}
                  moveItem={moveItem}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
            {hasLeft && previews.length > 4 && (
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
            {hasRight && previews.length > 4 && (
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
          <div className={styles.inputMore}>
            <label htmlFor="append">
              <span className="material-symbols-rounded">add_circle</span>
            </label>
            <input
              id="append"
              type="file"
              accept=".png, .jpg, .jpeg"
              multiple
              onChange={handleChange}
            />
          </div>
        </div>
      </DropDown>
    </div>
  );
}

export default PreviewList;
