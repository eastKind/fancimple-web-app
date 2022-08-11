import React, {
  useState,
  useEffect,
  forwardRef,
  Dispatch,
  SetStateAction,
} from "react";
import classNames from "classnames";
import Editor from "react-avatar-editor";
import useWindowSize from "../hooks/useWindowSize";
import styles from "../essets/scss/EditorSlide.module.scss";

interface EditorSlideProps {
  files: FileList;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  size: { w: number; h: number };
}

function EditorSlide(
  { files, index, setIndex, size }: EditorSlideProps,
  ref: React.LegacyRef<Editor>
) {
  const { height: innerHeight } = useWindowSize();
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(files.length > 1 ? true : false);

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
    if (index === 0) {
      setHasLeft(false);
      setHasRight(files.length > 1 ? true : false);
    } else if (index === files.length - 1) {
      setHasLeft(true);
      setHasRight(false);
    } else {
      setHasLeft(true);
      setHasRight(true);
    }
  }, [index, files]);

  return (
    <div className={styles.container}>
      <div className={styles.slide} style={style}>
        {[...files].map((file, i) => (
          <div key={i} className={styles.slideItem}>
            <Editor
              ref={ref}
              width={size.w}
              height={size.h}
              image={file}
              border={[0, 0]}
              style={{
                maxWidth: innerHeight * 0.7,
                maxHeight: innerHeight * 0.7,
                aspectRatio: "1 / 1",
              }}
            />
          </div>
        ))}
        ;
      </div>
      {files.length > 1 && (
        <div className={styles.bulletContainer}>
          {[...files].map((_, bulletIndex) => (
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

export default forwardRef(EditorSlide);
