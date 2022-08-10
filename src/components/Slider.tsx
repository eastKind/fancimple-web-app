import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "../essets/scss/Slider.module.scss";

interface SlideProps {
  arr: any[];
  children: React.ReactNode;
  className?: string;
  selectedIndex?: number;
  transition?: boolean;
}

function Slider({
  arr,
  children,
  className,
  selectedIndex = 0,
  transition = true,
}: SlideProps) {
  const [index, setIndex] = useState(0);
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(arr.length > 1 ? true : false);

  const style = {
    transform: `translateX(-${index}00%)`,
    transition: transition ? "all 0.4s ease-in-out" : "none",
  };

  const handleClickArrow = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLSpanElement;
    setIndex((prev) => {
      return eventTarget.id ? prev - 1 : prev + 1;
    });
  };

  useEffect(() => {
    setIndex(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    if (index === 0) {
      setHasLeft(false);
      setHasRight(arr.length > 1 ? true : false);
    } else if (index === arr.length - 1) {
      setHasLeft(true);
      setHasRight(false);
    } else {
      setHasLeft(true);
      setHasRight(true);
    }
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
