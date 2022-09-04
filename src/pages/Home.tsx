import React from "react";
import { Helmet } from "react-helmet";
import Container from "../components/Container";
import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";
import styles from "../essets/scss/Home.module.scss";

function Home() {
  return (
    <>
      <Helmet>
        <title>fancimple</title>
      </Helmet>
      <Container className={styles.container}>
        <SearchBar className={styles.searchBar} />
        <PostList />
      </Container>
    </>
  );
}

export default Home;
