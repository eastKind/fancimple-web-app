import React, { useEffect, useRef, useCallback } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { getPosts } from "../redux/thunks/post";
import { initPost } from "../redux/reducers/post";
import { GetPostsReqData, MyParams } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Spinner from "../components/Spinner";
import GridItem from "../components/GridItem";
import styles from "../essets/scss/ProfileHome.module.scss";

function ProfileHome() {
  const { id: userId } = useParams<keyof MyParams>() as MyParams;
  const { posts, cursor, hasNext, loading } = useAppSelector(
    (state) => state.post
  );
  const dispatch = useAppDispatch();
  const targetRef = useRef<any>(null);
  const isInterSecting = useInfiniteScroll(targetRef);

  const handleLoad = useCallback(
    async (options: GetPostsReqData) => {
      await dispatch(getPosts(options));
    },
    [dispatch]
  );

  useEffect(() => {
    handleLoad({ userId, cursor: "", limit: 9 });
    return () => {
      dispatch(initPost());
    };
  }, [userId, handleLoad, dispatch]);

  useEffect(() => {
    if (isInterSecting && hasNext) handleLoad({ userId, cursor, limit: 9 });
  }, [isInterSecting, hasNext, userId, cursor, handleLoad]);

  return (
    <>
      <div className={styles.grid}>
        {posts.map((post) => (
          <GridItem key={post._id} post={post} />
        ))}
      </div>
      {loading && posts.length === 0 && (
        <div className={styles.spinner}>
          <Spinner size={36} />
        </div>
      )}
      <div
        className={classNames(styles.observer, hasNext && styles.show)}
        ref={targetRef}
      >
        {loading && <Spinner size={36} />}
      </div>
    </>
  );
}

export default ProfileHome;
