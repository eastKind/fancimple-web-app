import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
// import useWindowSize from "../hooks/useWindowSize";
// import { useAppDispatch } from "../redux/hooks";
// import { test } from "../redux/thunks/post";
import ImgCrop from "./ImgCrop";
import PreviewList from "./PreviewList";
import styles from "../essets/scss/ImageEditor.module.scss";
import EditorSlide from "./EditorSlide";

interface ImageEditorProps {
  steps: number;
  files: File[];
  ratio: string;
  setImages: Dispatch<SetStateAction<Blob[]>>;
  onChange: (files: FileList) => void;
  onEdit: (ratio: string) => void;
  onDelete: (index: number) => void;
}

function ImageEditor({
  steps,
  files,
  ratio,
  onChange,
  onEdit,
  onDelete,
  setImages,
}: ImageEditorProps) {
  const [index, setIndex] = useState(0);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = e.target.files;
    if (nextFiles) onChange(nextFiles);
  };

  const handleEdit = (nextRatio: string) => onEdit(nextRatio);

  useEffect(() => {
    if (files.length < 1) return;
    setIndex((prev) => (prev ? prev : 0));

    const nextUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(nextUrls);

    return () => {
      nextUrls.forEach((url) => URL.revokeObjectURL(url));
      setPreviews([]);
    };
  }, [files]);

  return (
    <div className={styles.container}>
      {steps === 0 && (
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
      {0 < steps && steps < 3 && (
        <EditorSlide
          steps={steps}
          previews={previews}
          index={index}
          ratio={ratio}
          setIndex={setIndex}
          setImages={setImages}
        />
      )}
      {steps === 1 && (
        <ImgCrop onCrop={handleEdit} className={styles.cropBtn} />
      )}
      {steps === 1 && (
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
      {steps === 4 && <div>게시물 등록이 완료되었습니다</div>}
    </div>
  );
}

export default ImageEditor;
