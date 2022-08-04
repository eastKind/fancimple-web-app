import React, { useEffect, useRef, useCallback } from "react";
import classNames from "classnames";
import { getPosts } from "../redux/thunks/post";
import { initPost } from "../redux/reducers/post";
import { GetPostsReqData } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Spinner from "../components/Spinner";
import GridItem from "../components/GridItem";
import styles from "../essets/scss/Bookmarks.module.scss";

function Bookmark() {
  const { posts, cursor, hasNext, loading, error } = useAppSelector(
    (state) => state.post
  );
  const dispatch = useAppDispatch();
  const targetRef = useRef<any>(null);
  const isInterSecting = useInfiniteScroll(targetRef);

  const handleLoad = useCallback(
    async (options: GetPostsReqData) => {
      if (!options.cursor) dispatch(initPost());
      await dispatch(getPosts(options));
    },
    [dispatch]
  );

  useEffect(() => {
    handleLoad({ userId: "", cursor: "", limit: 9, bookmark: true });
  }, [handleLoad]);

  useEffect(() => {
    if (isInterSecting && hasNext)
      handleLoad({ userId: "", cursor, limit: 9, bookmark: true });
  }, [isInterSecting, hasNext, cursor, handleLoad]);

  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className={styles.grid}>
        {posts.map((post) => (
          <GridItem key={post._id} post={post} />
        ))}
      </div>
      <div
        className={classNames(styles.observer, hasNext && styles.show)}
        ref={targetRef}
      >
        {loading && <Spinner size="18px" />}
      </div>
    </>
  );
}

export default Bookmark;
