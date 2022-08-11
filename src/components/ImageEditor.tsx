import React, { useState, useEffect, useRef } from "react";
import useWindowSize from "../hooks/useWindowSize";
// import { useAppDispatch } from "../redux/hooks";
// import { test } from "../redux/thunks/post";
import ImgCrop from "./ImgCrop";
import PreviewList from "./PreviewList";
import styles from "../essets/scss/ImageEditor.module.scss";
import EditorSlide from "./EditorSlide";

interface ImageEditorProps {
  files: FileList | null;
  onChange: (files: FileList) => void;
}

function ImageEditor({ files, onChange }: ImageEditorProps) {
  const { width: innerWidth, height: innerHeight } = useWindowSize();
  const MAX_WIDTH = innerHeight * 0.7;
  const [style, setStyle] = useState({});
  const [size, setSize] = useState({ w: innerWidth, h: innerWidth });
  const [previews, setPreviews] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const editorRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = e.target.files;
    if (nextFiles) onChange(nextFiles);
  };

  const handleStyle = (innerWidth: number, innerHeight: number) => {
    const nextStyle = {
      width: innerWidth,
      maxWidth: innerHeight * 0.7,
      maxHeight: innerHeight * 0.7,
      aspectRatio: "1 / 1",
    };
    setStyle(nextStyle);
  };

  const handleCrop = (id: string) => {
    const nextWidth = innerWidth > MAX_WIDTH ? MAX_WIDTH : innerWidth;
    if (id === "1/1") {
      setSize({
        w: nextWidth,
        h: nextWidth,
      });
    } else if (id === "16/9") {
      setSize({
        w: nextWidth,
        h: nextWidth * 0.5625,
      });
    } else {
      setSize({
        w: nextWidth * 0.8,
        h: nextWidth,
      });
    }
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

  useEffect(() => {
    if (!files) return;
    const nextPreviews = [...files].map((file) => URL.createObjectURL(file));
    setPreviews(nextPreviews);

    return () => {
      nextPreviews.forEach((preview) => URL.revokeObjectURL(preview));
      setPreviews([]);
    };
  }, [files]);

  useEffect(() => {
    handleStyle(innerWidth, innerHeight);
    setSize({ w: innerWidth, h: innerWidth });
  }, [innerWidth, innerHeight]);

  return (
    <div className={styles.container} style={style}>
      {files ? (
        <EditorSlide
          files={files}
          index={index}
          setIndex={setIndex}
          size={size}
          ref={editorRef}
        />
      ) : (
        <div className={styles.inputContainer}>
          사진을 끌어다 놓거나 클릭하세요
          <input
            type="file"
            multiple
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
          />
        </div>
      )}
      {files && <ImgCrop onCrop={handleCrop} className={styles.cropBtn} />}
      {previews.length > 0 && (
        <PreviewList
          previews={previews}
          index={index}
          setIndex={setIndex}
          className={styles.previewsBtn}
        />
      )}
    </div>
  );
}

export default ImageEditor;
