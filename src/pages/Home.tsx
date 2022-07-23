import React, { useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { GetPostsQuery } from "../types";
import { getPosts } from "../redux/postSlice";
import Container from "../components/Container";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import styles from "../essets/scss/Home.module.scss";

function Home() {
  const { sessionId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLoad = useCallback(async (arg: GetPostsQuery) => {
    await dispatch(getPosts(arg));
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    handleLoad({ cursor: "", limit: 10 });
  }, [handleLoad]);

  if (!sessionId) return <Navigate to="/signin" />;

  return (
    <>
      <Helmet>
        <title>추억은 다이내믹, 포스팅은 심플</title>
      </Helmet>
      <Container className={styles.container}>
        <h1>Home</h1>
        <PostForm />
        <PostList />
      </Container>
    </>
  );
}

export default Home;
