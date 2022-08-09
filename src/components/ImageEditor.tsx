import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import useWindowSize from "../hooks/useWindowSize";
import { useAppDispatch } from "../redux/hooks";
import { test } from "../redux/thunks/post";
import Editor from "react-avatar-editor";
import Slider from "./Slider";
import styles from "../essets/scss/ImageEditor.module.scss";

interface ImageEditorProps {
  files: FileList | null;
  onChange: (files: FileList) => void;
}

function ImageEditor({ files, onChange }: ImageEditorProps) {
  const { width: innerWidth, height: innerHeight } = useWindowSize();
  const WIDTH = innerWidth * 0.5;
  const MAX_WIDTH = innerHeight * 0.7;
  const [style, setStyle] = useState({});
  const [editorSize, setEditorSize] = useState({ w: WIDTH, h: WIDTH });
  const [previews, setPreviews] = useState<string[]>([]);
  const editorRef: React.LegacyRef<Editor> = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = e.target.files;
    if (nextFiles) onChange(nextFiles);
  };

  const handleStyle = (innerWidth: number, innerHeight: number) => {
    const nextStyle = {
      width: innerWidth * 0.5,
      maxWidth: innerHeight * 0.7,
      maxHeight: innerHeight * 0.7,
      aspectRatio: "1 / 1",
    };
    setStyle(nextStyle);
  };

  const handleEditorSize = (e: React.MouseEvent<HTMLDivElement>) => {
    const nextWidth = WIDTH > MAX_WIDTH ? MAX_WIDTH : WIDTH;
    const { id } = e.target as HTMLButtonElement;
    if (id === "1/1") {
      setEditorSize({
        w: nextWidth,
        h: nextWidth,
      });
    } else if (id === "16/9") {
      setEditorSize({
        w: nextWidth,
        h: nextWidth * 0.5625,
      });
    } else {
      setEditorSize({
        w: nextWidth * 0.8,
        h: nextWidth,
      });
    }
  };

  const handlePreviews = (files: FileList) => {
    [...files].forEach((file) => {
      const nextPreview = URL.createObjectURL(file);
      setPreviews((prev) => [...prev, nextPreview]);
    });
  };

  // const handleSubmit = () => {
  //   if (!editorRef.current) return;
  //   const canvas = editorRef.current.getImageScaledToCanvas();
  //   canvas.toBlob(async (blob) => {
  //     if (!blob) return;
  //     const formData = new FormData();
  //     formData.append("photo", blob);
  //     await dispatch(test(formData));
  //   });
  // };

  // useEffect(() => {
  //   if (index === 0) setHasLeft(false);
  //   if (index === images.length - 1) setHasRight(false);
  // }, [index, images.length]);

  useEffect(() => {
    if (!files) return;
    handlePreviews(files);
  }, [files]);

  useEffect(() => {
    handleStyle(innerWidth, innerHeight);
    setEditorSize({ w: innerWidth * 0.5, h: innerWidth * 0.5 });
  }, [innerWidth, innerHeight]);

  return (
    <div className={styles.container} style={style}>
      {files ? (
        <Slider arr={[...files]} className={styles.slider}>
          {[...files].map((file, i) => (
            <div key={i} className={styles.slideItem}>
              <Editor
                ref={editorRef}
                width={editorSize.w}
                height={editorSize.h}
                image={file}
                border={[0, 0]}
                style={{
                  maxWidth: MAX_WIDTH,
                  maxHeight: MAX_WIDTH,
                  aspectRatio: "1 / 1",
                }}
                className={styles.editor}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className={styles.inputContainer}>
          <label htmlFor="fileInput">이미지</label>
          <input id="fileInput" type="file" multiple onChange={handleChange} />
        </div>
      )}
      {files && (
        <div className={styles.btns} onClick={handleEditorSize}>
          <button id="1/1">1:1</button>
          <button id="16/9">16:9</button>
          <button id="4/5">4:5</button>
        </div>
      )}
      {previews.length > 0 && (
        <div className={styles.previews}>
          {previews.map((preview, i) => (
            <img key={i} src={preview} alt={""} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageEditor;
