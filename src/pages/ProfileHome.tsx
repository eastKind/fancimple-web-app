import React, { useEffect, useRef, useCallback } from "react";
import classNames from "classnames";
import { useOutletContext } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { getPosts } from "../redux/thunks/post";
import { initPost } from "../redux/reducers/post";
import { GetPostsReqData } from "../types";
import Spinner from "../components/Spinner";
import styles from "../essets/scss/ProfileHome.module.scss";

interface OutletContext {
  userId: string;
}

function ProfileHome() {
  const { userId }: OutletContext = useOutletContext();
  const { posts, cursor, hasNext, loading } = useAppSelector(
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

  const handleLoadMore = useCallback(
    async (options: GetPostsReqData) => {
      await handleLoad(options);
    },
    [handleLoad]
  );

  useEffect(() => {
    if (!userId) return;
    handleLoad({ userId, cursor: "", limit: 9 });
  }, [userId, handleLoad]);

  useEffect(() => {
    if (isInterSecting && hasNext) handleLoadMore({ userId, cursor, limit: 9 });
  }, [isInterSecting, hasNext, userId, cursor, handleLoadMore]);

  return (
    <>
      <div className={styles.grid}>
        {posts.map((post) => (
          <div key={post._id} className={styles.gridItem}>
            <img src={post.images[0].url} alt="" />
          </div>
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

export default ProfileHome;
