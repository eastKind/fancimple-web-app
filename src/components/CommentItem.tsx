import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch } from "../redux/hooks";
import useIsLiked from "../hooks/useIsLiked";
import useIsMe from "../hooks/useIsMe";
import { deleteComment, likesComment } from "../redux/thunks/comment";
import { CommentData } from "../types";
import rtf from "../utils/rtf";
import Avatar from "./Avatar";
import styles from "../essets/scss/CommentItem.module.scss";
import Spinner from "./Spinner";

interface ListItemProps {
  comment: CommentData;
}

function CommentItem({ comment }: ListItemProps) {
  const { _id, postId, writer, contents, createdAt, likeUsers } = comment;
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();
  const isLiked = useIsLiked(likeUsers);
  const isMe = useIsMe(writer._id);

  const handleDeleteClick = async () => {
    try {
      setIsDeleting(true);
      await dispatch(deleteComment({ commentId: _id, postId }));
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLikesClick = async () => {
    try {
      await dispatch(likesComment({ commentId: _id, isLiked }));
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <Link to={`${writer._id}/post`} className={styles.avatar}>
        <Avatar photo={writer.photoUrl} name={writer.name} />
      </Link>
      <div className={styles.body}>
        <div className={styles.header}>
          <Link to={`${writer._id}/post`}>
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
            onClick={handleLikesClick}
            className={classNames(
              "material-symbols-rounded",
              styles.likeBtn,
              isLiked && styles.liked
            )}
          >
            favorite
          </span>
          <span className={styles.likeCount}>좋아요 {likeUsers.length}개</span>
          <span className={styles.createdAt}>{rtf(createdAt)}</span>
        </div>
      </div>
      {isDeleting && (
        <div className={styles.spinner}>
          <Spinner size="18px" />
        </div>
      )}
    </div>
  );
}

export default CommentItem;
