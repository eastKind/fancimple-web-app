import React, { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { getPosts } from "../redux/thunks/post";
import { initPost } from "../redux/reducers/post";
import { GetPostsReqData } from "../types";
import PostGrid from "../components/PostGrid";

interface OutletContext {
  userId: string;
}

function ProfileHome() {
  const { userId }: OutletContext = useOutletContext();
  const { posts, cursor, hasNext } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const targetRef = useRef<any>(null);
  const isInterSecting = useInfiniteScroll(targetRef);

  const handleLoad = async (options: GetPostsReqData) => {
    if (!options.cursor) dispatch(initPost());
    await dispatch(getPosts(options));
  };

  const handleLoadMore = async (options: GetPostsReqData) => {
    await handleLoad(options);
  };

  useEffect(() => {
    if (!userId) return;
    handleLoad({ userId, cursor: "", limit: 9 });
  }, [userId]);

  useEffect(() => {
    if (isInterSecting && hasNext) handleLoadMore({ userId, cursor, limit: 9 });
  }, [isInterSecting]);

  return (
    <>
      <PostGrid posts={posts} />
      <div ref={targetRef} />
    </>
  );
}

export default ProfileHome;
