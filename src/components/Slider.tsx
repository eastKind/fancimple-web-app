import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "../essets/scss/Slider.module.scss";

interface SlideProps {
  arr: any[];
  children: React.ReactNode;
  className?: string;
  selectedIndex?: number;
}

function Slider({ arr, children, className, selectedIndex = 0 }: SlideProps) {
  const [index, setIndex] = useState(0);
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(arr.length > 1 ? true : false);

  const style = {
    transform: `translateX(-${index}00%)`,
  };

  const handleClickArrow = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLSpanElement;
    if (eventTarget.id) {
      setIndex((prev) => (prev -= 1));
      setHasRight(true);
    } else {
      setIndex((prev) => (prev += 1));
      setHasLeft(true);
    }
  };

  useEffect(() => {
    setIndex(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    if (index === 0) {
      setHasLeft(false);
      setHasRight(arr.length > 1 ? true : false);
    }
    if (index === arr.length - 1) setHasRight(false);
  }, [index, arr]);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.slide} style={style} draggable>
        {children}
      </div>
      {arr.length > 1 && (
        <div className={styles.bulletContainer}>
          {arr.map((_, bulletIndex) => (
            <span
              key={bulletIndex}
              className={classNames(
                styles.bullets,
                bulletIndex === index && styles.selected
              )}
            ></span>
          ))}
        </div>
      )}
      {hasLeft && (
        <span
          id="left"
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
  );
}

export default Slider;
