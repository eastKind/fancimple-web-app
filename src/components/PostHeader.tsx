import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { User } from "../types";
import useIsMe from "../hooks/useIsMe";
import Avatar from "./Avatar";
import DropDown from "./DropDown";
import MyMenu from "./MyMenu";
import OthersMenu from "./OthersMenu";
import styles from "../essets/scss/PostHeader.module.scss";

interface PostHeaderProps {
  postId: string;
  writer: User;
}

function PostHeader({ postId, writer }: PostHeaderProps) {
  const [show, setShow] = useState(false);
  const isMe = useIsMe(writer._id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow((prev) => !prev);
  };

  return (
    <div className={styles.header}>
      <Link to={`/${writer._id}/post`} state={{ isMe }}>
        <Avatar photo={writer.photoUrl} name={writer.name} />
      </Link>
      <Link to={`/${writer._id}/post`} state={{ isMe }}>
        <span className={styles.name}>{writer.name}</span>
      </Link>
      <span
        onClick={handleClick}
        className={classNames("material-symbols-rounded", styles.moreBtn)}
      >
        more_horiz
      </span>
      <DropDown show={show} setShow={setShow}>
        {isMe ? (
          <MyMenu postId={postId} />
        ) : (
          <OthersMenu postId={postId} writerId={writer._id} />
        )}
      </DropDown>
    </div>
  );
}

export default PostHeader;
