import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "../essets/scss/Slider.module.scss";

interface SlideProps {
  arr: any[];
  children: React.ReactNode;
  className?: string;
}

function Slider({ arr, children, className }: SlideProps) {
  const [index, setIndex] = useState(0);
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(arr.length > 1 ? true : false);

  const style = {
    transform: `translateX(-${index}00%)`,
  };

  const handleClickArrow = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLSpanElement;
    setIndex((prev) => {
      return eventTarget.id ? prev - 1 : prev + 1;
    });
  };

  useEffect(() => {
    if (index > arr.length - 1) setIndex(arr.length - 1);
    if (index) setHasLeft(true);
    else setHasLeft(false);
    if (index < arr.length - 1) setHasRight(true);
    else setHasRight(false);
  }, [index, arr]);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.slide} style={style}>
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
      {hasLeft && arr.length > 1 && (
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
      {hasRight && arr.length > 1 && (
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
