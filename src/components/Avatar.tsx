import React from "react";
import classNames from "classnames";
import defaultPhoto from "../essets/images/person.png";
import styles from "../essets/scss/Avatar.module.scss";

interface AvatarProps {
  photo: string | undefined;
  name: string | undefined;
  className?: string;
  [key: string]: any;
}

function Avatar({
  photo = defaultPhoto,
  name = "프로필 이미지",
  className,
  ...otherProps
}: AvatarProps) {
  return (
    <img
      src={photo}
      alt={name}
      className={classNames(styles.avatar, className)}
      {...otherProps}
    />
  );
}

export default Avatar;
