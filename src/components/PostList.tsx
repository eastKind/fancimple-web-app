import React, { useRef, useEffect, useCallback } from "react";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getPosts } from "../redux/thunks/post";
import { initPost } from "../redux/reducers/post";
import { GetPostsReqData } from "../types";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Spinner from "./Spinner";
import PostItem from "./PostItem";
import styles from "../essets/scss/PostList.module.scss";

function PostList() {
  const { posts, cursor, hasNext, loading } = useAppSelector(
    (state) => state.post
  );
  const dispatch = useAppDispatch();
  const targetRef = useRef<HTMLDivElement>(null);
  const isInterSecting = useInfiniteScroll(targetRef);

  const handleLoad = useCallback(
    async (options: GetPostsReqData) => {
      await dispatch(getPosts(options));
    },
    [dispatch]
  );

  useEffect(() => {
    handleLoad({ cursor: "", limit: 10 });
    return () => {
      dispatch(initPost());
    };
  }, [handleLoad, dispatch]);

  useEffect(() => {
    if (isInterSecting && hasNext) {
      handleLoad({ cursor, limit: 10 });
    }
  }, [isInterSecting, hasNext, cursor, handleLoad]);

  return (
    <>
      <ul className={styles.list}>
        {posts?.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </ul>
      {loading && posts.length === 0 && (
        <div className={styles.spinner}>
          <Spinner size="45px" />
        </div>
      )}
      <div
        className={classNames(styles.observer, hasNext && styles.show)}
        ref={targetRef}
      >
        {loading && <Spinner size="45px" />}
      </div>
    </>
  );
}

export default PostList;
