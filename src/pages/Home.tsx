import React, { useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { GetPostsReqData } from "../types";
import { getPosts } from "../redux/thunks/post";
import { initPost } from "../redux/reducers/post";
import Container from "../components/Container";
import PostList from "../components/PostList";
import styles from "../essets/scss/Home.module.scss";

function Home() {
  const { sessionId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLoad = useCallback(
    async (options: GetPostsReqData) => {
      dispatch(initPost());
      await dispatch(getPosts(options));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!sessionId) return;
    handleLoad({ userId: "", cursor: "", limit: 10 });
  }, [handleLoad, sessionId]);

  if (!sessionId) return <Navigate to="/signin" />;

  return (
    <>
      <Helmet>
        <title>fancimple</title>
      </Helmet>
      <Container className={styles.container}>
        <PostList />
      </Container>
    </>
  );
}

export default Home;
