import React from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useLikeState from "../hooks/useLikeState";
import useMarkState from "../hooks/useMarkState";
import { likesPost } from "../redux/thunks/post";
import { bookmark } from "../redux/thunks/user";
import { PostData } from "../types";
import styles from "../essets/scss/Interactions.module.scss";

interface InteractionsProps {
  post: PostData;
  onComment: () => void;
}

function Interactions({ post, onComment }: InteractionsProps) {
  const { _id, likeUsers } = post;
  const { isLiked, setIsLiked } = useLikeState(likeUsers);
  const { isMarked, setIsMarked } = useMarkState(_id);
  const { loading } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const handleComment = () => onComment();

  const handleLikes = async () => {
    if (loading) return;
    setIsLiked((prev) => !prev);
    await dispatch(likesPost({ postId: _id, isLiked }));
  };

  const handleBookmark = async () => {
    if (loading) return;
    setIsMarked((prev) => !prev);
    await dispatch(bookmark({ postId: _id, isMarked }));
  };

  return (
    <div className={styles.interactions}>
      <span
        onClick={handleLikes}
        className={classNames(
          "material-symbols-rounded",
          isLiked && styles.liked
        )}
      >
        favorite
      </span>
      <span className="material-symbols-rounded" onClick={handleComment}>
        mode_comment
      </span>
      <span
        className={classNames(
          "material-symbols-rounded",
          isMarked && styles.marked
        )}
        onClick={handleBookmark}
      >
        bookmark
      </span>
    </div>
  );
}

export default Interactions;
