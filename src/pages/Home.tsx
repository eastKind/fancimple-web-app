import React, { useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useAppDispatch } from "../redux/hooks";
import { GetPostsReqData } from "../types";
import { getPosts } from "../redux/thunks/post";
import { initPost } from "../redux/reducers/post";
import Container from "../components/Container";
import PostList from "../components/PostList";
import styles from "../essets/scss/Home.module.scss";

function Home() {
  const dispatch = useAppDispatch();

  const handleLoad = useCallback(
    async (options: GetPostsReqData) => {
      try {
        dispatch(initPost());
        await dispatch(getPosts(options));
      } catch (error: any) {
        alert(error.message);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    handleLoad({ cursor: "", limit: 10 });
  }, [handleLoad]);

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
