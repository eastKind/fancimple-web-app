import type { PostData } from "../types";
import React, { useState, useEffect, CSSProperties } from "react";
import useWindowSize from "../hooks/useWindowSize";
import Post from "../pages/Post";
import Slider from "./Slider";
import PostHeader from "./PostHeader";
import Interactions from "./Interactions";
import styles from "../essets/scss/Detail.module.scss";

interface DetailProps {
  post: PostData;
}

function Detail({ post }: DetailProps) {
  const { images, ratio } = post;
  const [style, setStyle] = useState({});
  const [modal, setModal] = useState(false);
  const { innerHeight } = useWindowSize();

  const handleStyle = (height: number, ratio: string) => {
    const maxHeight = height * 0.8;
    const maxWidth = ratio === "4/5" ? maxHeight * 0.8 : maxHeight;
    const aspectRatio = ratio === "4/5" ? "0.8" : "1";
    const nextStyle: CSSProperties = { maxHeight, maxWidth, aspectRatio };
    setStyle(nextStyle);
  };

  const handleModal = () => setModal((prev) => !prev);

  useEffect(() => {
    handleStyle(innerHeight, ratio);
  }, [innerHeight, ratio]);

  if (modal) return <Post post={post} />;

  return (
    <div className={styles.container}>
      <div className={styles.slide} style={style}>
        <Slider arr={images}>
          {images.map((image) => (
            <img key={image._id} src={image.url} alt="" />
          ))}
        </Slider>
      </div>
      <div className={styles.overlay}>
        <PostHeader post={post} variant="inverse" />
        <Interactions post={post} onComment={handleModal} variant="inverse" />
      </div>
    </div>
  );
}

export default Detail;
