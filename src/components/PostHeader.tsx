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
}

function PostHeader({ post }: PostHeaderProps) {
  const { writer } = post;
  const [drop, setDrop] = useState(false);
  const isMe = useIsMe(writer._id);

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
        <span className={styles.name}>{writer.name}</span>
      </Link>
      <div className={styles.moreBtn}>
        <span onClick={handleDrop} className="material-symbols-rounded">
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
