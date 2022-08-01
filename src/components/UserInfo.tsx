import React from "react";
import { UserData } from "../types";
import AvatarForm from "./AvatarForm";
import styles from "../essets/scss/UserInfo.module.scss";

interface UserInfoProps {
  user: UserData;
}

function UserInfo({ user }: UserInfoProps) {
  return (
    <div className={styles.container}>
      <AvatarForm user={user} />
      <div className={styles.infoContainer}>
        <p className={styles.name}>{user.name}</p>
        <div className={styles.follow}>
          <span>팔로워 {user.followers.length}</span>
          <span>팔로우 {user.followings.length}</span>
        </div>
        <span>{"Hello :)"}</span>
      </div>
    </div>
  );
}

export default UserInfo;
