import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch } from "../redux/hooks";
import { deleteComment } from "../redux/commentSlice";
import { CommentData } from "../types";
import rtf from "../utils/rtf";
import Avatar from "./Avatar";
import styles from "../essets/scss/CommentItem.module.scss";

interface ListItemProps {
  comment: CommentData;
}

function CommentItem({ comment }: ListItemProps) {
  const { writer, contents, createdAt, likeCount } = comment;
  const dispatch = useAppDispatch();

  const handleDeleteClick = async () => {
    await dispatch(deleteComment(comment._id));
  };

  return (
    <div className={styles.container}>
      <Link to={writer._id} className={styles.avatar}>
        <Avatar photo={writer.photoUrl} name={writer.name} />
      </Link>
      <div className={styles.body}>
        <div className={styles.header}>
          <Link to={writer._id}>
            <span>{writer.name}</span>
          </Link>
          <span
            className={classNames("material-symbols-rounded", styles.moreBtn)}
          >
            more_horiz
          </span>
        </div>
        <div className={styles.contents}>{contents}</div>
        <div className={styles.footer}>
          <span
            className={classNames("material-symbols-rounded", styles.likeBtn)}
          >
            favorite
          </span>
          <span className={styles.likeCount}>좋아요 {likeCount}개</span>
          <span className={styles.createdAt}>{rtf(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
