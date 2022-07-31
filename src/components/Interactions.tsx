import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { likesPost } from "../redux/thunks/post";
import { PostData } from "../types";
import styles from "../essets/scss/Interactions.module.scss";

interface InteractionsProps {
  post: PostData;
  onComment: () => void;
}

function Interactions({ post, onComment }: InteractionsProps) {
  const { _id: postId, likeUsers } = post;
  const { me } = useAppSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(likeUsers.includes(me._id));
  const dispatch = useAppDispatch();

  const handleComment = () => onComment();

  const handleLikes = async () => {
    try {
      await dispatch(likesPost({ postId, isLiked }));
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    setIsLiked(likeUsers.includes(me._id));
  }, [likeUsers]);

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
      <span className="material-symbols-rounded">bookmark</span>
    </div>
  );
}

export default Interactions;
