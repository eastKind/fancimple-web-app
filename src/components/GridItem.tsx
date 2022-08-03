import React, { useState } from "react";
import classNames from "classnames";
import { PostData } from "../types";
import Modal from "./Modal";
import Post from "../pages/Post";
import styles from "../essets/scss/GridItem.module.scss";

interface GridItemProps {
  post: PostData;
}

function GridItem({ post }: GridItemProps) {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(true);

  return (
    <>
      <div key={post._id} className={styles.gridItem} onClick={handleClick}>
        <img src={post.images[0].url} alt="" />
        <div className={styles.overlay}>
          <span
            className={classNames("material-symbols-rounded", styles.symbols)}
          >
            favorite
          </span>
          <span className={styles.count}>{post.likeCount}</span>
          <span
            className={classNames("material-symbols-rounded", styles.symbols)}
          >
            mode_comment
          </span>
          <span className={styles.count}>{post.commentCount}</span>
        </div>
      </div>
      <Modal show={show} setShow={setShow}>
        <Post post={post} />
      </Modal>
    </>
  );
}

export default GridItem;
