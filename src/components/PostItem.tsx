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
  const { images, texts, commentCount, likeUsers, createdAt } = post;
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => setModalOpen((prev) => !prev);

  return (
    <>
      <li className={styles.listItem}>
        <div className={styles.header}>
          <PostHeader post={post} />
        </div>
        <Slider arr={images} className={styles.slide}>
          {images.map((image) => (
            <img key={image._id} src={image.url} alt="" />
          ))}
        </Slider>
        <div className={styles.body}>
          <Interactions post={post} onComment={handleModal} />
          <span>좋아요 {likeUsers.length}개</span>
          <p className={styles.texts}>{texts}</p>
        </div>
        <div className={styles.footer}>
          <p onClick={handleModal} className={styles.comment}>
            {commentCount > 0
              ? `댓글 ${commentCount}개 모두 보기`
              : "댓글 쓰러가기"}
          </p>
          <p className={styles.createdAt}>{rtf(createdAt)}</p>
        </div>
      </li>
      <Modal isOpen={modalOpen} onClose={handleModal}>
        <Post post={post} />
      </Modal>
    </>
  );
}

export default PostItem;
