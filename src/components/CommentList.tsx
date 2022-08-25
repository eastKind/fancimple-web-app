import React, { useRef, useEffect, useCallback } from "react";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getComments } from "../redux/thunks/comment";
import { initComment } from "../redux/reducers/comment";
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
      try {
        await dispatch(getComments(options));
      } catch (error: any) {
        alert(error.message);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    handleLoad({ postId, cursor: "", limit: 10 });
    return () => {
      dispatch(initComment());
    };
  }, [postId, handleLoad, dispatch]);

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
      {loading && comments.length === 0 && <Spinner size="24px" />}
      <div
        className={classNames(styles.observer, hasNext && styles.show)}
        ref={targetRef}
      >
        {loading && <Spinner size="24px" />}
      </div>
    </ul>
  );
}

export default CommentList;
