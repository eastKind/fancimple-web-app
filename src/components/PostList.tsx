import React, { useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { deletePost, getPosts } from "../redux/postSlice";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { PostData, GetPostsQuery } from "../types";
import Button from "./Button";
import styles from "./PostList.module.scss";

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
      <h2>{post.title}</h2>
      <div className={styles.imageContainer}>
        {post.images?.map((image) => (
          <img key={image._id} src={image.url} alt="" width="75" />
        ))}
      </div>
      <p>{post.contents}</p>
      <p>{post.createdAt}</p>
      <p>{post.writer.name}</p>
      <Button
        variant={undefined}
        className={undefined}
        as={undefined}
        onClick={handleDeleteClick}
      >
        삭제
      </Button>
    </li>
  );
}

function PostList() {
  const { posts, cursor, hasNext } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const targetRef = useRef<any>(null);
  const isInterSecting = useInfiniteScroll(targetRef);

  const handleLoad = async (arg: GetPostsQuery) => {
    await dispatch(getPosts(arg));
  };

  useEffect(() => {
    if (isInterSecting && hasNext) handleLoad({ cursor, limit: 10 });
  }, [isInterSecting]);

  return (
    <ul className={styles.list}>
      {posts?.map((post) => (
        <ListItem key={post._id} post={post} />
      ))}
      <div className={styles.loadMore} ref={targetRef}></div>
    </ul>
  );
}

export default PostList;
