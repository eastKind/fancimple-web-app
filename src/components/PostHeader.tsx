import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PostData } from "../types";
import useIsMe from "../hooks/useIsMe";
import Avatar from "./Avatar";
import MyMenu from "./MyMenu";
import OthersMenu from "./OthersMenu";
import styles from "../essets/scss/PostHeader.module.scss";

interface PostHeaderProps {
  post: PostData;
  variant?: "inverse";
}

function PostHeader({ post, variant }: PostHeaderProps) {
  const { writer } = post;
  const [drop, setDrop] = useState(false);
  const isMe = useIsMe(writer._id);

  const style = variant ? { color: "#fff" } : {};

  const handleDrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDrop(true);
  };

  return (
    <div className={styles.header}>
      <Link to={`/${writer._id}/post`}>
        <Avatar photo={writer.photoUrl} name={writer.name} />
      </Link>
      <Link to={`/${writer._id}/post`}>
        <span className={styles.name} style={style}>
          {writer.name}
        </span>
      </Link>
      <div className={styles.moreBtn}>
        <span
          onClick={handleDrop}
          className="material-symbols-rounded"
          style={style}
        >
          more_horiz
        </span>
      </div>
      {isMe ? (
        <MyMenu post={post} isDropped={drop} setDrop={setDrop} />
      ) : (
        <OthersMenu post={post} isDropped={drop} setDrop={setDrop} />
      )}
    </div>
  );
}

export default PostHeader;
