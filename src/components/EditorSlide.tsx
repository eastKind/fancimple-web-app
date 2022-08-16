import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import Editor from "react-avatar-editor";
import useWindowSize from "../hooks/useWindowSize";
import styles from "../essets/scss/EditorSlide.module.scss";

const INIT = 1080;

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
  const { innerHeight } = useWindowSize();
  const [width, setWidth] = useState(INIT);
  const [height, setHeight] = useState(INIT);
  const [style, setStyle] = useState({});
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(previews.length > 1 ? true : false);
  // const editorRef: LegacyRef<Editor> = useRef(null);

  const handleSize = (ratio: string) => {
    if (ratio === "1/1") {
      setWidth((prev) => (prev === INIT ? prev : INIT));
      setHeight((prev) => (prev === INIT ? prev : INIT));
    } else if (ratio === "4/5") {
      const nextWidth = INIT * 0.8;
      setWidth((prev) => (prev === nextWidth ? prev : nextWidth));
      setHeight((prev) => (prev === INIT ? prev : INIT));
    } else {
      const nextHeight = INIT * 0.5625;
      setWidth((prev) => (prev === INIT ? prev : INIT));
      setHeight((prev) => (prev === nextHeight ? prev : nextHeight));
    }
  };

  const handleStyle = (ratio: string, innerHeight: number) => {
    let maxWidth = innerHeight * 0.8;
    let maxHeight = innerHeight * 0.8;

    if (ratio === "4/5") {
      maxWidth = innerHeight * 0.8 * 0.8;
    }
    if (ratio === "16/9") {
      maxHeight = innerHeight * 0.8 * 0.5625;
    }
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
    handleStyle(ratio, innerHeight);
  }, [ratio, innerHeight]);

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
              width={width}
              height={height}
              image={url}
              border={[0, 0]}
              style={style}
              className={styles.editor}
            />
          </div>
        ))}
        ;
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
