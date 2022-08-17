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
  const [drop, setDrop] = useState(false);
  const isMe = useIsMe(writer._id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDrop((prev) => !prev);
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
      <DropDown show={drop} setShow={setDrop}>
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
