import React from "react";
import { UserData } from "../types";
import { useAppDispatch } from "../redux/hooks";
import { follow } from "../redux/thunks/user";
import AvatarForm from "./AvatarForm";
import styles from "../essets/scss/UserInfo.module.scss";
import Button from "./Button";
import useIsFollowed from "../hooks/useIsFollowed";

interface UserInfoProps {
  user: UserData;
  isMe: boolean;
}

function UserInfo({ user, isMe }: UserInfoProps) {
  const isFollowed = useIsFollowed(user.followers);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    try {
      await dispatch(follow({ userId: user._id, isFollowed }));
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <AvatarForm user={user} />
      <div className={styles.infoContainer}>
        <div className={styles.header}>
          <p className={styles.name}>{user.name}</p>
          {isMe || (
            <Button
              onClick={handleClick}
              className={styles.followBtn}
              variant="inverse"
            >
              {isFollowed ? "팔로우 취소" : "팔로우"}
            </Button>
          )}
        </div>
        <div className={styles.counts}>
          <span>게시물 {user.postCount}</span>
          <span>팔로워 {user.followers.length}</span>
          <span>팔로우 {user.followings.length}</span>
        </div>
        <span>{"Hello :)"}</span>
      </div>
    </div>
  );
}

export default UserInfo;
