import React, {
  useState,
  useEffect,
  forwardRef,
  Dispatch,
  SetStateAction,
} from "react";
import classNames from "classnames";
import Editor from "react-avatar-editor";
import styles from "../essets/scss/EditorSlide.module.scss";

interface EditorSlideProps {
  previews: string[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  width: number;
  height: number;
}

function EditorSlide(
  { previews, index, setIndex, width, height }: EditorSlideProps,
  ref: React.LegacyRef<Editor>
) {
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(previews.length > 1 ? true : false);

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
    if (index) setHasLeft(true);
    else setHasLeft(false);
    if (index < previews.length - 1) setHasRight(true);
    else setHasRight(false);
  }, [index, previews]);

  return (
    <div className={styles.container}>
      <div className={styles.slide} style={style}>
        {previews.map((url, i) => (
          <div key={i} className={styles.slideItem}>
            <Editor
              ref={ref}
              width={width}
              height={height}
              image={url}
              border={[0, 0]}
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

export default forwardRef(EditorSlide);
