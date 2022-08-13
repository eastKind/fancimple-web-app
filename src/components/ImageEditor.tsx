import React, { useState, useEffect, useRef } from "react";
import useWindowSize from "../hooks/useWindowSize";
// import { useAppDispatch } from "../redux/hooks";
// import { test } from "../redux/thunks/post";
import ImgCrop from "./ImgCrop";
import PreviewList from "./PreviewList";
import styles from "../essets/scss/ImageEditor.module.scss";
import EditorSlide from "./EditorSlide";

interface ImageEditorProps {
  files: File[] | null;
  onChange: (files: FileList) => void;
  onDelete: (index: number) => void;
}

function ImageEditor({ files, onChange, onDelete }: ImageEditorProps) {
  const { innerWidth, innerHeight } = useWindowSize();
  const [width, setWidth] = useState(Math.min(innerWidth, innerHeight * 0.8));
  const [height, setHeight] = useState(Math.min(innerWidth, innerHeight * 0.8));
  const [index, setIndex] = useState(0);
  const [previews, setPreviews] = useState<string[]>([]);
  const editorRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = e.target.files;
    if (nextFiles) onChange(nextFiles);
  };

  const handleCrop = (id: string) => {
    const nextValue = Math.min(innerWidth, innerHeight * 0.8);
    if (id === "1/1") {
      setWidth((prev) => (prev === nextValue ? prev : nextValue));
      setHeight((prev) => (prev === nextValue ? prev : nextValue));
    } else if (id === "16/9") {
      const nextHeight = nextValue * 0.5625;
      setWidth((prev) => (prev === nextValue ? prev : nextValue));
      setHeight((prev) => (prev === nextHeight ? prev : nextHeight));
    } else {
      const nextWidth = nextValue * 0.8;
      setWidth((prev) => (prev === nextWidth ? prev : nextWidth));
      setHeight((prev) => (prev === nextValue ? prev : nextValue));
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
    setIndex((prev) => (prev ? prev : 0));

    const nextUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(nextUrls);

    return () => {
      nextUrls.forEach((url) => URL.revokeObjectURL(url));
      setPreviews([]);
    };
  }, [files]);

  useEffect(() => {
    setWidth(Math.min(innerWidth, innerHeight * 0.8));
    setHeight(Math.min(innerWidth, innerHeight * 0.8));
  }, [innerWidth, innerHeight]);

  return (
    <div className={styles.container}>
      {files ? (
        <EditorSlide
          previews={previews}
          index={index}
          setIndex={setIndex}
          width={width}
          height={height}
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
          setPreviews={setPreviews}
          index={index}
          setIndex={setIndex}
          onChange={onChange}
          onDelete={onDelete}
          className={styles.previewsBtn}
        />
      )}
    </div>
  );
}

export default ImageEditor;
