import React from "react";
import { Helmet } from "react-helmet";
import Container from "../components/Container";
import PostList from "../components/PostList";
import Search from "../components/Search";
import styles from "../essets/scss/Home.module.scss";

function Home() {
  return (
    <>
      <Helmet>
        <title>fancimple</title>
      </Helmet>
      <Container className={styles.container}>
        <div className={styles.postList}>
          <PostList />
        </div>
        <div className={styles.search}>
          <Search />
        </div>
      </Container>
    </>
  );
}

export default Home;
