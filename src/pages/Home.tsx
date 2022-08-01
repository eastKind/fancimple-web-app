import React, { useEffect } from "react";
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

  const handleLoad = async (arg: GetPostsReqData) => {
    dispatch(initPost());
    await dispatch(getPosts(arg));
  };

  useEffect(() => {
    if (!sessionId) return;
    handleLoad({ userId: "", cursor: "", limit: 10 });
  }, []);

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
