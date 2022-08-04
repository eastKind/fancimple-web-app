import React, { useState, useEffect } from "react";
import { UserData } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { follow } from "../redux/thunks/user";
import AvatarForm from "./AvatarForm";
import Avatar from "./Avatar";
import styles from "../essets/scss/UserInfo.module.scss";
import Button from "./Button";

interface UserInfoProps {
  user: UserData;
  isMe: boolean;
}

function UserInfo({ user, isMe }: UserInfoProps) {
  const { me } = useAppSelector((state) => state.user);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    try {
      await dispatch(follow({ userId: user._id, isFollowed }));
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    setIsFollowed(user.followers.includes(me._id));
  }, [user.followers, me._id]);

  return (
    <div className={styles.container}>
      {isMe ? (
        <AvatarForm user={user} />
      ) : (
        <Avatar
          photo={user.photoUrl}
          name={user.name}
          className={styles.avatar}
        />
      )}
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
