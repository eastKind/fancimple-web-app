import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { PostData } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updatePost } from "../redux/thunks/post";
import Slider from "../components/Slider";
import TextEditor from "../components/TextEditor";
import styles from "../essets/scss/Update.module.scss";
import Spinner from "../components/Spinner";

interface UpdateProps {
  post: PostData;
  onCancel: () => void;
}

function Update({ post, onCancel }: UpdateProps) {
  const [images, setImages] = useState(post.images);
  const [texts, setTexts] = useState(post.texts);
  const [deletedKeys, setDeletedKeys] = useState<string[]>([]);
  const [width, setWidth] = useState("100%");
  const [isDone, setIsDone] = useState(false);
  const { loading } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    setIsDone(true);
    await dispatch(updatePost({ postId: post._id, texts, deletedKeys }));
  };

  const handleCancle = () => onCancel();

  const handleImageDelete = (key: string) => {
    setImages((prev) => prev.filter((image) => image.key !== key));
    setDeletedKeys((prev) => [...prev, key]);
  };

  const handleTextChange = (value: string) => setTexts(value);

  useEffect(() => {
    if (post.ratio === "4/5") setWidth("80%");
  }, [post.ratio]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>게시물 수정</span>
        {isDone || (
          <div className={styles.btns}>
            <span onClick={handleCancle}>취소</span>
            <span onClick={handleSubmit}>완료</span>
          </div>
        )}
      </div>
      <div className={styles.body}>
        {isDone ? (
          <div className={styles.imgSection}>
            {loading ? (
              <Spinner size="60px" />
            ) : (
              <div className={styles.done}>게시물 수정이 완료되었습니다.</div>
            )}
          </div>
        ) : (
          <div className={styles.imgSection}>
            <Slider arr={images}>
              {images.map((image) => (
                <div key={image._id} className={styles.slideItem}>
                  <img src={image.url} alt="" width={width} />
                  {images.length > 2 && (
                    <div className={styles.deleteBtn}>
                      <span
                        className="material-symbols-rounded"
                        onClick={() => handleImageDelete(image.key)}
                      >
                        delete
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </Slider>
          </div>
        )}
        <div className={classNames(styles.textSection, isDone && styles.hide)}>
          <TextEditor texts={texts} onChange={handleTextChange} />
        </div>
      </div>
    </div>
  );
}

export default Update;
