import React, { useState } from "react";
import { PostData } from "../types";
import rtf from "../utils/rtf";
import Slider from "./Slider";
import Modal from "./Modal";
import Post from "../pages/Post";
import PostHeader from "./PostHeader";
import Interactions from "./Interactions";
import styles from "../essets/scss/PostItem.module.scss";

interface PostItemProps {
  post: PostData;
}

function PostItem({ post }: PostItemProps) {
  const [show, setShow] = useState(false);
  const { _id, images, writer, contents, commentCount, likeUsers, createdAt } =
    post;

  const handleComment = () => setShow((prev) => !prev);

  return (
    <>
      <li className={styles.listItem}>
        <div className={styles.header}>
          <PostHeader postId={_id} writer={writer} />
        </div>
        <Slider arr={images} className={styles.slide}>
          {images.map((image) => (
            <img key={image._id} src={image.url} alt="" />
          ))}
        </Slider>
        <div className={styles.body}>
          <Interactions post={post} onComment={handleComment} />
          <span>좋아요 {likeUsers.length}개</span>
          <p className={styles.contents}>{contents}</p>
        </div>
        <div className={styles.footer}>
          <p onClick={handleComment} className={styles.comment}>
            {commentCount > 0
              ? `댓글 ${commentCount}개 모두 보기`
              : "댓글 쓰러가기"}
          </p>
          <p className={styles.createdAt}>{rtf(createdAt)}</p>
        </div>
      </li>
      <Modal show={show} setShow={setShow}>
        <Post post={post} />
      </Modal>
    </>
  );
}

export default PostItem;
