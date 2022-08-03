import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch } from "../redux/hooks";
import useIsMe from "../hooks/useIsMe";
import { deleteComment } from "../redux/thunks/comment";
import { CommentData } from "../types";
import rtf from "../utils/rtf";
import Avatar from "./Avatar";
import styles from "../essets/scss/CommentItem.module.scss";

interface ListItemProps {
  comment: CommentData;
}

function CommentItem({ comment }: ListItemProps) {
  const { _id, postId, writer, contents, createdAt, likeCount } = comment;
  const dispatch = useAppDispatch();
  const isMe = useIsMe(writer._id);

  const handleDeleteClick = async () => {
    try {
      await dispatch(deleteComment({ commentId: _id, postId }));
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <Link
        to={`${writer._id}/post`}
        state={{ isMe }}
        className={styles.avatar}
      >
        <Avatar photo={writer.photoUrl} name={writer.name} />
      </Link>
      <div className={styles.body}>
        <div className={styles.header}>
          <Link to={`${writer._id}/post`} state={{ isMe }}>
            <span>{writer.name}</span>
          </Link>
          {isMe && (
            <span
              onClick={handleDeleteClick}
              className={classNames(
                "material-symbols-rounded",
                styles.removeBtn
              )}
            >
              remove
            </span>
          )}
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
