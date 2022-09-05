import React, { MouseEvent } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
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
  const { sessionId } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent) => {
    if (!sessionId) {
      alert("로그인이 필요한 서비스입니다.");
      return navigate("/signin");
    }
    const { id } = e.target as HTMLSpanElement;
    if (id === "likes") handleLikes();
    else if (id === "bookmark") handleBookmark();
    else onComment();
  };

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
    <div className={styles.interactions} onClick={handleClick}>
      <span
        id="likes"
        className={classNames(
          "material-symbols-rounded",
          isLiked && styles.liked
        )}
      >
        favorite
      </span>
      <span id="comment" className="material-symbols-rounded">
        mode_comment
      </span>
      <span
        id="bookmark"
        className={classNames(
          "material-symbols-rounded",
          isMarked && styles.marked
        )}
      >
        bookmark
      </span>
    </div>
  );
}

export default Interactions;
