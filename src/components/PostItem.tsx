import React, { useState } from "react";
import { PostData } from "../types";
import rtf from "../utils/rtf";
import Slide from "./Slide";
import styles from "../essets/scss/PostItem.module.scss";
import Modal from "./Modal";
import Post from "../pages/Post";
import PostHeader from "./PostHeader";
import Interactions from "./Interactions";

interface PostItemProps {
  post: PostData;
}

function PostItem({ post }: PostItemProps) {
  const [show, setShow] = useState(false);
  const { _id, images, writer, contents, commentCount, likeCount, createdAt } =
    post;

  const handleComment = () => setShow((prev) => !prev);

  return (
    <>
      <li className={styles.listItem}>
        {/* Header */}
        <div className={styles.header}>
          <PostHeader postId={_id} writer={writer} />
        </div>

        {/* Slide */}
        <Slide images={images} className={styles.slide} />

        {/* Body */}
        <div className={styles.body}>
          <Interactions post={post} onComment={handleComment} />
          <span>좋아요 {likeCount}개</span>
          <p className={styles.contents}>
            {contents}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quo
            molestias officiis! Earum dicta esse minus mollitia magni at rerum
            illum! Adipisci at voluptatibus hic nostrum quasi dolore et ipsa.
          </p>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p onClick={handleComment} className={styles.comment}>
            {commentCount > 1
              ? `댓글 ${commentCount}개 모두 보기`
              : "댓글 쓰러가기"}
          </p>
          <p className={styles.createdAt}>{rtf(createdAt)}</p>
        </div>
      </li>

      {/* Modal */}
      <Modal show={show} setShow={setShow}>
        <Post post={post} />
      </Modal>
    </>
  );
}

export default PostItem;
1;
