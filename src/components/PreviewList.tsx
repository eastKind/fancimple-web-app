import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import DropDown from "./DropDown";
import PreviewItem from "./PreviewItem";
import styles from "../essets/scss/PreviewList.module.scss";
import Tooltip from "./Tooltip";

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
  const [drop, setDrop] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(false);
  const [location, setLocation] = useState(0);

  const MAX_WIDTH = 400;
  const WIDTH = 100;
  const START = 0;
  const END = MAX_WIDTH - previews.length * WIDTH;

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

  const handleDelete = (deleteIdx: number) => {
    if (location !== START) setLocation((prev) => (prev += 100));
    onDelete(deleteIdx);
  };

  const handleDrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDrop(true);
  };

  const handleCloseTooltip = () => setTooltipOpen(false);

  const handleClickPreview = (e: React.MouseEvent) => {
    const { value, tagName } = e.target as HTMLLIElement;
    if (tagName === "LI") setIndex(value);
    if (tooltipOpen) handleCloseTooltip();
  };

  const handleClickArrow = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLSpanElement;
    setLocation((prev) => {
      const next = eventTarget.id
        ? prev - 300 < END
          ? END
          : prev - 300
        : prev + 300 > START
        ? START
        : prev + 300;
      return next;
    });
  };

  useEffect(() => {
    if (location < START) setHasLeft(true);
    else setHasLeft(false);
    if (location > END) setHasRight(true);
    else setHasRight(false);
  }, [location, END]);

  useEffect(() => {
    setTimeout(() => {
      setTooltipOpen(true);
    }, 2000);
  }, []);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.previewBtn}>
        <span className={"material-symbols-rounded"} onClick={handleDrop}>
          photo_library
        </span>
      </div>
      <DropDown isDropped={drop} setDrop={setDrop}>
        <div className={styles.slideContainer}>
          <div className={styles.slide}>
            <ul
              className={styles.previewList}
              onMouseDown={handleClickPreview}
              style={{ transform: `translateX(${location}px)` }}
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
          {tooltipOpen && (
            <Tooltip onClose={handleCloseTooltip} className={styles.tooltip}>
              사진을 드래그해서 순서를 바꿔보세요.
            </Tooltip>
          )}
        </div>
      </DropDown>
    </div>
  );
}

export default PreviewList;
