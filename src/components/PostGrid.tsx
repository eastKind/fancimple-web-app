import React from "react";
import { PostData } from "../types";
import styles from "../essets/scss/PostGrid.module.scss";

interface PostGridProps {
  posts: PostData[];
}

function PostGrid({ posts }: PostGridProps) {
  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <div key={post._id} className={styles.gridItem}>
          <img src={post.images[0].url} alt="" />
        </div>
      ))}
    </div>
  );
}

export default PostGrid;
