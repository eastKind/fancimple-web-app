import React from "react";
import { UserData } from "../types";
import AvatarForm from "./AvatarForm";
import styles from "../essets/scss/ProfileHeader.module.scss";

interface ProfileHeaderProps {
  user: UserData;
}

function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className={styles.container}>
      <AvatarForm user={user} />
    </div>
  );
}

export default ProfileHeader;
