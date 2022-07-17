import React from "react";
import { useAppSelector } from "../redux/hooks";
import { PostData } from "../types";
import styles from "./PostList.module.scss";

interface ListItemProps {
  post: PostData;
}

function ListItem({ post }: ListItemProps) {
  return (
    <>
      <h2>{post.title}</h2>
      <div className={styles.imageContainer}>
        {post.images?.map((image) => (
          <img key={image.id} src={image.url} alt="" width="75" />
        ))}
      </div>
      <p>{post.contents}</p>
      <p>{post.writer.name}</p>
    </>
  );
}

function PostList() {
  const { posts } = useAppSelector((state) => state.post);

  return (
    <ul className={styles.list}>
      {posts?.map((post) => (
        <li key={post.id} className={styles.listItem}>
          <ListItem post={post} />
        </li>
      ))}
    </ul>
  );
}

export default PostList;
