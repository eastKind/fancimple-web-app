import type { PostData } from "../types";
import React, { useState } from "react";
import classNames from "classnames";
import useWindowSize from "../hooks/useWindowSize";
import Modal from "./Modal";
import Detail from "./Detail";
import Post from "../pages/Post";
import styles from "../essets/scss/GridItem.module.scss";

interface GridItemProps {
  post: PostData;
}

function GridItem({ post }: GridItemProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { innerWidth } = useWindowSize();

  const handleModal = () => setModalOpen((prev) => !prev);

  return (
    <>
      <div key={post._id} className={styles.gridItem} onClick={handleModal}>
        <img src={post.images[0].url} alt="" />
        <div className={styles.overlay}>
          <span
            className={classNames("material-symbols-rounded", styles.symbols)}
          >
            favorite
          </span>
          <span className={styles.count}>{post.likeUsers.length}</span>
          <span
            className={classNames("material-symbols-rounded", styles.symbols)}
          >
            mode_comment
          </span>
          <span className={styles.count}>{post.commentCount}</span>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={handleModal}>
        {innerWidth > 768 ? <Post post={post} /> : <Detail post={post} />}
      </Modal>
    </>
  );
}

export default GridItem;
