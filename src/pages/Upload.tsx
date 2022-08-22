import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ImageEditor from "../components/ImageEditor";
import styles from "../essets/scss/Upload.module.scss";
import TextEditor from "../components/TextEditor";
import { createPost } from "../redux/thunks/post";
import Spinner from "../components/Spinner";

function Upload() {
  const [images, setImages] = useState<Blob[]>([]);
  const [ratio, setRatio] = useState("1/1");
  const [texts, setTexts] = useState("");
  const [steps, setSteps] = useState(0);
  const [indicator, setIndicator] = useState("작성");
  const { loading } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const handleImageEdit = (nextRatio: string) => {
    setRatio(nextRatio);
  };

  const handleTextChange = (nextTexts: string) => setTexts(nextTexts);

  const handleClickPrev = () => {
    setSteps((prev) => (prev -= 1));
  };

  const handleClickNext = async () => {
    setSteps((prev) => (prev += 1));
    if (steps === 2) {
      const formData = new FormData();
      formData.append("texts", texts);
      formData.append("ratio", ratio);
      images.forEach((image) => {
        formData.append("image", image);
      });
      await dispatch(createPost(formData));
      setSteps((prev) => (prev += 1));
    }
  };

  useEffect(() => {
    switch (steps) {
      case 0:
        setIndicator("게시물 생성");
        break;
      case 1:
        setIndicator("자르기");
        break;
      case 2:
        setIndicator("텍스트 입력");
        break;
      case 3:
        setIndicator("게시물 등록 중");
        break;
      case 4:
        setIndicator("게시물 등록 완료");
        break;
      default:
        break;
    }
  }, [steps]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {0 < steps && steps < 3 && (
          <div>
            <span onClick={handleClickPrev} className={styles.prev}>
              이전
            </span>
            <span onClick={handleClickNext} className={styles.next}>
              {steps < 2 ? "다음" : "완료"}
            </span>
          </div>
        )}
        <div className={styles.indicator}>{indicator}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.imgSection}>
          {loading ? (
            <Spinner size="60px" />
          ) : (
            <ImageEditor
              steps={steps}
              ratio={ratio}
              onEdit={handleImageEdit}
              setImages={setImages}
              setSteps={setSteps}
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
