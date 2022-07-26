import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { PostData } from "../types";
import rtf from "../utils/rtf";
import Slide from "./Slide";
import Avatar from "./Avatar";
import styles from "../essets/scss/PostItem.module.scss";

interface PostItemProps {
  post: PostData;
}

function PostItem({ post }: PostItemProps) {
  const { _id, images, writer, contents, commentCount, likeCount, createdAt } =
    post;

  return (
    <li className={styles.listItem}>
      {/* Header */}
      <div className={styles.header}>
        <Link to={`/${writer._id}`}>
          <Avatar photo={writer.photoUrl} name={writer.name} />
        </Link>
        <Link to={`/${writer._id}`}>
          <span className={styles.name}>{writer.name}</span>
        </Link>
        <span
          className={classNames("material-symbols-rounded", styles.moreBtn)}
        >
          more_horiz
        </span>
      </div>

      {/* Slide */}
      <Slide images={images} className={styles.slide} />

      {/* Main */}
      <div className={styles.main}>
        <div className={styles.interactions}>
          <span className="material-symbols-rounded">favorite</span>
          <span className="material-symbols-rounded">mode_comment</span>
          <span className="material-symbols-rounded">bookmark</span>
        </div>
        <span>좋아요 {likeCount}개</span>
        <p className={styles.contents}>
          {contents}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad quo
          molestias officiis! Earum dicta esse minus mollitia magni at rerum
          illum! Adipisci at voluptatibus hic nostrum quasi dolore et ipsa.
        </p>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Link to={`/post/${_id}`}>
          <p>
            {commentCount > 1
              ? `댓글 ${commentCount}개 모두 보기`
              : "댓글 쓰러가기"}
          </p>
        </Link>
        <p className={styles.createdAt}>{rtf(createdAt)}</p>
      </div>
    </li>
  );
}

export default PostItem;
1;
