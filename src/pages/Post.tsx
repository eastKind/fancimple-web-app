import React, { useState, useEffect, useCallback, CSSProperties } from "react";
import { useAppDispatch } from "../redux/hooks";
import { getComments } from "../redux/commentSlice";
import useWindowSize from "../hooks/useWindowSize";
import { GetCommentsReqData, PostData } from "../types";
import rtf from "../utils/rtf";
import Slide from "../components/Slide";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import PostHeader from "../components/PostHeader";
import Interactions from "../components/Interactions";
import styles from "../essets/scss/Post.module.scss";

interface PostProps {
  post: PostData;
}

function Post({ post }: PostProps) {
  const { _id, images, writer, contents, likeCount, createdAt } = post;
  const [style, setStyle] = useState({});
  const { height } = useWindowSize();
  const dispatch = useAppDispatch();

  const handleStyle = (height: number, aspectRatio: string) => {
    const ratio = Number(aspectRatio);
    const maxHeight = height * 0.9;
    const maxWidth = ratio > 1 ? maxHeight / ratio : maxHeight;
    const nextStyle: CSSProperties = { maxHeight, maxWidth, aspectRatio };
    setStyle(nextStyle);
  };

  const handleLoad = useCallback(async (options: GetCommentsReqData) => {
    await dispatch(getComments(options));
  }, []);

  useEffect(() => {
    handleStyle(height, "1");
  }, [height]);

  useEffect(() => {
    handleLoad({ postId: _id, cursor: "", limit: 10 });
  }, [handleLoad]);

  return (
    <div className={styles.container}>
      <div className={styles.slide} style={style}>
        <Slide images={images} />
      </div>
      <div className={styles.texts}>
        <div className={styles.header}>
          <PostHeader postId={_id} writer={writer} />
        </div>
        <div className={styles.body}>
          <p className={styles.contents}>
            {contents}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quo
            molestias officiis! Earum dicta esse minus mollitia magni at rerum
            illum! Adipisci at voluptatibus hic nostrum quasi dolore et ipsa.
          </p>
          <CommentList postId={_id} />
        </div>
        <div className={styles.footer}>
          <Interactions post={post} onComment={() => console.log("hi")} />
          <span>좋아요 {likeCount}개</span>
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
