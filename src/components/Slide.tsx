import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Image } from "../types";
import styles from "../essets/scss/Slide.module.scss";

interface SlideProps {
  images: Image[];
  className?: string;
}

function Slide({ images, className }: SlideProps) {
  const [index, setIndex] = useState(0);
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(images.length > 1 ? true : false);

  const style = {
    transform: `translateX(-${index}00%)`,
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLSpanElement;
    setIndex((prev) => {
      return target.id ? prev - 1 : prev + 1;
    });
  };

  useEffect(() => {
    if (index === 0) {
      setHasLeft(false);
    } else if (index === images.length - 1) {
      setHasRight(false);
    } else {
      setHasLeft(true);
      setHasRight(true);
    }
  }, [index, images.length]);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.slide} style={style}>
        {images.map((image) => (
          <img key={image._id} src={image.url} alt="" />
        ))}
      </div>
      <div className={styles.bulletContainer}>
        {images.map((image, bulletIndex) => (
          <span
            key={image._id}
            className={classNames(
              styles.bullets,
              bulletIndex === index && styles.selected
            )}
          ></span>
        ))}
      </div>
      {hasLeft && (
        <span
          id="left"
          onClick={handleClick}
          className={classNames(
            styles.arrow,
            styles.left,
            "material-symbols-outlined"
          )}
        >
          chevron_left
        </span>
      )}
      {hasRight && (
        <span
          onClick={handleClick}
          className={classNames(
            styles.arrow,
            styles.right,
            "material-symbols-outlined"
          )}
        >
          chevron_right
        </span>
      )}
    </div>
  );
}

export default Slide;
