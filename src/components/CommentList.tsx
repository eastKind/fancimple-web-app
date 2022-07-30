import React, { useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getComments } from "../redux/thunks/comment";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { GetCommentsReqData } from "../types";
import CommentItem from "./CommentItem";
import Spinner from "./Spinner";
import styles from "../essets/scss/CommentList.module.scss";

interface CommentListProps {
  postId: string;
}

function CommentList({ postId }: CommentListProps) {
  const { loading, comments, cursor, hasNext } = useAppSelector(
    (state) => state.comment
  );
  const dispatch = useAppDispatch();
  const targetRef = useRef<any>(null);
  const isInterSecting = useInfiniteScroll(targetRef);

  const handleLoadMore = async (arg: GetCommentsReqData) => {
    await dispatch(getComments(arg));
  };

  useEffect(() => {
    if (isInterSecting && hasNext)
      handleLoadMore({ postId, cursor, limit: 10 });
  }, [isInterSecting]);

  return (
    <ul className={styles.list}>
      {comments?.map((comment) => (
        <li key={comment._id} className={styles.listItem}>
          <CommentItem comment={comment} />
        </li>
      ))}
      <div className={styles.loadMore} ref={targetRef}>
        {loading && <Spinner size="18px" />}
      </div>
    </ul>
  );
}

export default CommentList;
