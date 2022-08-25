import React, { useState, useEffect, CSSProperties } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { PostData } from "../types";
import rtf from "../utils/rtf";
import Slider from "../components/Slider";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import PostHeader from "../components/PostHeader";
import Interactions from "../components/Interactions";
import styles from "../essets/scss/Post.module.scss";

interface PostProps {
  post: PostData;
}

function Post({ post }: PostProps) {
  const { _id, images, texts, likeUsers, createdAt, ratio } = post;
  const [style, setStyle] = useState({});
  const { innerHeight } = useWindowSize();

  const handleStyle = (height: number, ratio: string) => {
    const maxHeight = height * 0.9;
    const maxWidth = ratio === "4/5" ? maxHeight * 0.8 : maxHeight;
    const aspectRatio = ratio === "4/5" ? "0.8" : "1";
    const nextStyle: CSSProperties = { maxHeight, maxWidth, aspectRatio };
    setStyle(nextStyle);
  };

  useEffect(() => {
    handleStyle(innerHeight, ratio);
  }, [innerHeight, ratio]);

  return (
    <div className={styles.container}>
      <div className={styles.slide} style={style}>
        <Slider arr={images}>
          {images.map((image) => (
            <img key={image._id} src={image.url} alt="" />
          ))}
        </Slider>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.header}>
          <PostHeader post={post} />
        </div>
        <div className={styles.body}>
          <p className={styles.texts}>{texts}</p>
          <CommentList postId={_id} />
        </div>
        <div className={styles.footer}>
          <Interactions post={post} onComment={() => console.log("hi")} />
          <span>좋아요 {likeUsers.length}개</span>
          <span className={styles.createdAt}>{rtf(createdAt)}</span>
        </div>
        <div className={styles.commentForm}>
          <CommentForm postId={_id} />
        </div>
      </div>
    </div>
  );
}

export default Post;
