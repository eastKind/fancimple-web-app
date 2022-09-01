import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import Editor from "react-avatar-editor";
import useWindowSize from "../hooks/useWindowSize";
import styles from "../essets/scss/EditorSlide.module.scss";

const INIT = 1080;
const MARGIN = 20 * 2;

interface EditorSlideProps {
  steps: number;
  previews: string[];
  index: number;
  ratio: string;
  setIndex: Dispatch<SetStateAction<number>>;
  setImages: Dispatch<SetStateAction<Blob[]>>;
}

function EditorSlide({
  steps,
  previews,
  index,
  ratio,
  setIndex,
  setImages,
}: EditorSlideProps) {
  const { innerHeight, innerWidth } = useWindowSize();
  const [size, setSize] = useState({ w: INIT, h: INIT });
  const [style, setStyle] = useState({});
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(previews.length > 1 ? true : false);

  const handleSize = (ratio: string) => {
    if (ratio === "1/1") {
      setSize({ w: INIT, h: INIT });
    } else if (ratio === "4/5") {
      setSize({ w: INIT * 0.8, h: INIT });
    } else {
      setSize({ w: INIT, h: INIT * 0.5625 });
    }
  };

  const handleStyle = (
    ratio: string,
    innerHeight: number,
    innerWidth: number
  ) => {
    let maxWidth = Math.min(innerHeight * 0.8, innerWidth - MARGIN);
    let maxHeight = maxWidth;
    if (ratio === "4/5") maxWidth *= 0.8;
    if (ratio === "16/9") maxHeight *= 0.5625;
    setStyle({ maxWidth, maxHeight });
  };

  const handleClickArrow = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLSpanElement;
    setIndex((prev) => {
      return eventTarget.id ? prev - 1 : prev + 1;
    });
  };

  useEffect(() => {
    handleSize(ratio);
  }, [ratio]);

  useEffect(() => {
    handleStyle(ratio, innerHeight, innerWidth);
  }, [ratio, innerHeight, innerWidth]);

  useEffect(() => {
    if (index) setHasLeft(true);
    else setHasLeft(false);
    if (index < previews.length - 1) setHasRight(true);
    else setHasRight(false);
  }, [index, previews]);

  useEffect(() => {
    if (steps !== 2) return;
    const canvases = document.getElementsByClassName(
      styles.editor
    ) as HTMLCollectionOf<HTMLCanvasElement>;
    [...canvases].forEach((canvas) => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        setImages((prev) => [...prev, blob]);
      });
    });

    return () => {
      setImages([]);
    };
  }, [steps, setImages]);

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.slide, steps === 2 && styles.done)}
        style={{ transform: `translateX(-${index}00%)` }}
      >
        {previews.map((url, i) => (
          <div key={i} className={styles.slideItem}>
            <Editor
              width={size.w}
              height={size.h}
              image={url}
              border={[0, 0]}
              style={style}
              className={styles.editor}
            />
          </div>
        ))}
      </div>
      {previews.length > 1 && (
        <div className={styles.bulletContainer}>
          {[...previews].map((_, bulletIndex) => (
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
      {hasLeft && previews.length > 1 && (
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
      {hasRight && previews.length > 1 && (
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

export default EditorSlide;
