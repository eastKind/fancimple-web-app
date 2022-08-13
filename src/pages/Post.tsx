import React, { useState, useEffect, useCallback, CSSProperties } from "react";
import { useAppDispatch } from "../redux/hooks";
import { getComments } from "../redux/thunks/comment";
import { initComment } from "../redux/reducers/comment";
import useWindowSize from "../hooks/useWindowSize";
import { GetCommentsReqData, PostData } from "../types";
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
  const { _id, images, writer, contents, likeUsers, createdAt } = post;
  const [style, setStyle] = useState({});
  const { innerHeight } = useWindowSize();
  const dispatch = useAppDispatch();

  const handleStyle = (height: number, aspectRatio: string) => {
    const ratio = Number(aspectRatio);
    const maxHeight = height * 0.9;
    const maxWidth = ratio > 1 ? maxHeight / ratio : maxHeight;
    const nextStyle: CSSProperties = { maxHeight, maxWidth, aspectRatio };
    setStyle(nextStyle);
  };

  const handleLoad = useCallback(
    async (options: GetCommentsReqData) => {
      try {
        dispatch(initComment());
        await dispatch(getComments(options));
      } catch (error: any) {
        alert(error.message);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    handleStyle(innerHeight, "1");
  }, [innerHeight]);

  useEffect(() => {
    handleLoad({ postId: _id, cursor: "", limit: 10 });
  }, [handleLoad, _id]);

  return (
    <div className={styles.container}>
      <div className={styles.slide} style={style}>
        <Slider arr={images}>
          {images.map((image) => (
            <img key={image._id} src={image.url} alt="" />
          ))}
        </Slider>
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
