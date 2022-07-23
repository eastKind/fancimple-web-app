import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { deletePost, getPosts } from "../redux/postSlice";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { PostData, GetPostsQuery } from "../types";
import Button from "./Button";
import Spinner from "./Spinner";
import Slide from "./Slide";
import styles from "../essets/scss/PostList.module.scss";

interface ListItemProps {
  post: PostData;
}

function ListItem({ post }: ListItemProps) {
  const dispatch = useAppDispatch();

  const handleDeleteClick = async () => {
    await dispatch(deletePost(post._id));
  };

  return (
    <li className={styles.listItem}>
      <h2>
        <Link to={`/post/${post._id}`}>{post.title}</Link>
      </h2>
      <Slide images={post.images} />
      <p>{post.contents}</p>
      <p>{post.createdAt}</p>
      <Link to={post.writer._id}>{post.writer.name}</Link>
      <Button onClick={handleDeleteClick}>삭제</Button>
    </li>
  );
}

function PostList() {
  const { posts, cursor, hasNext, loading } = useAppSelector(
    (state) => state.post
  );
  const dispatch = useAppDispatch();
  const targetRef = useRef<any>(null);
  const isInterSecting = useInfiniteScroll(targetRef);

  const handleLoadMore = async (arg: GetPostsQuery) => {
    await dispatch(getPosts(arg));
  };

  useEffect(() => {
    if (isInterSecting && hasNext) handleLoadMore({ cursor, limit: 10 });
  }, [isInterSecting]);

  return (
    <ul className={styles.list}>
      {posts?.map((post) => (
        <ListItem key={post._id} post={post} />
      ))}
      <div className={styles.loadMore} ref={targetRef}></div>
      {loading && <Spinner size="30px" />}
    </ul>
  );
}

export default PostList;
