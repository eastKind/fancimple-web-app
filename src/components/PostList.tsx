import React, { useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getPosts } from "../redux/thunks/post";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { GetPostsReqData } from "../types";
import Spinner from "./Spinner";
import PostItem from "./PostItem";
import styles from "../essets/scss/PostList.module.scss";

function PostList() {
  const { posts, cursor, hasNext, loading } = useAppSelector(
    (state) => state.post
  );
  const dispatch = useAppDispatch();
  const targetRef = useRef<any>(null);
  const isInterSecting = useInfiniteScroll(targetRef);

  const handleLoad = async (arg: GetPostsReqData) => {
    await dispatch(getPosts(arg));
  };

  useEffect(() => {
    if (isInterSecting && hasNext)
      handleLoad({ userId: "", cursor, limit: 10 });
  }, [isInterSecting]);

  return (
    <ul className={styles.list}>
      {posts?.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
      <div className={styles.loadMore} ref={targetRef}></div>
      {loading && <Spinner size="30px" />}
    </ul>
  );
}

export default PostList;
