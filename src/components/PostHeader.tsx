import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { User } from "../types";
import Avatar from "./Avatar";
import styles from "../essets/scss/PostHeader.module.scss";

interface PostHeaderProps {
  writer: User;
}

function PostHeader({ writer }: PostHeaderProps) {
  return (
    <div className={styles.header}>
      <Link to={`/${writer._id}`}>
        <Avatar photo={writer.photoUrl} name={writer.name} />
      </Link>
      <Link to={`/${writer._id}`}>
        <span className={styles.name}>{writer.name}</span>
      </Link>
      <span className={classNames("material-symbols-rounded", styles.moreBtn)}>
        more_horiz
      </span>
    </div>
  );
}

export default PostHeader;
