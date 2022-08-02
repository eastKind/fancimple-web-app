import React, { useRef, useEffect, useCallback } from "react";
import classNames from "classnames";
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

  const handleLoad = useCallback(
    async (options: GetCommentsReqData) => {
      await dispatch(getComments(options));
    },
    [dispatch]
  );

  useEffect(() => {
    if (isInterSecting && hasNext) handleLoad({ postId, cursor, limit: 10 });
  }, [isInterSecting, hasNext, postId, cursor, handleLoad]);

  return (
    <ul className={styles.list}>
      {comments?.map((comment) => (
        <li key={comment._id} className={styles.listItem}>
          <CommentItem comment={comment} />
        </li>
      ))}
      <div
        className={classNames(styles.observer, hasNext && styles.show)}
        ref={targetRef}
      >
        {loading && <Spinner size="18px" />}
      </div>
    </ul>
  );
}

export default CommentList;
