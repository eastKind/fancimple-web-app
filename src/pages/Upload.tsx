import React, { useState } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ImageEditor from "../components/ImageEditor";
import styles from "../essets/scss/Upload.module.scss";
import TextEditor from "../components/TextEditor";
import { createPost } from "../redux/thunks/post";
import Spinner from "../components/Spinner";

function Upload() {
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<Blob[]>([]);
  const [ratio, setRatio] = useState("1/1");
  const [texts, setTexts] = useState("");
  const [steps, setSteps] = useState(0);
  const { loading } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const handleImageChange = (nextFiles: FileList) => {
    if (files.length < 1) {
      setFiles([...nextFiles]);
    } else {
      setFiles([...files, ...nextFiles]);
    }
    setSteps(1);
  };

  const handleImageEdit = (nextRatio: string) => {
    setRatio(nextRatio);
  };

  const handleImageDelete = (index: number) => {
    const nextFiles = files.filter((_, i) => i !== index);
    setFiles(nextFiles);
  };

  const handleTextChange = (nextTexts: string) => setTexts(nextTexts);

  const handleClickPrev = () => {
    if (steps === 1) setFiles([]);
    setSteps((prev) => (prev -= 1));
  };
  const handleClickNext = async () => {
    setSteps((prev) => (prev += 1));
    if (steps === 2) {
      const formData = new FormData();
      formData.append("contents", texts);
      formData.append("ratio", ratio);
      images.forEach((image) => {
        formData.append("image", image);
      });
      await dispatch(createPost(formData));
      setSteps((prev) => (prev += 1));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {0 < steps && steps < 3 && (
          <div className={styles.steps}>
            <span onClick={handleClickPrev}>이전</span>
            <span onClick={handleClickNext}>{steps < 2 ? "다음" : "완료"}</span>
          </div>
        )}
        {steps === 0 && <div className={styles.init}>게시물 작성</div>}
        {steps === 3 && <div className={styles.init}>게시물 등록 중</div>}
        {steps === 4 && <div className={styles.init}>게시물 등록 완료</div>}
      </div>
      <div className={styles.body}>
        <div className={styles.imgSection}>
          {/* <Spinner size="60px" /> */}
          {loading ? (
            <Spinner size="60px" />
          ) : (
            <ImageEditor
              steps={steps}
              files={files}
              ratio={ratio}
              onChange={handleImageChange}
              onEdit={handleImageEdit}
              onDelete={handleImageDelete}
              setImages={setImages}
            />
          )}
        </div>
        <div
          className={classNames(styles.textSection, steps === 2 && styles.open)}
        >
          <TextEditor texts={texts} onChange={handleTextChange} />
        </div>
      </div>
    </div>
  );
}

export default Upload;
