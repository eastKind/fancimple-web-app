import React from "react";
import classNames from "classnames";
import defaultPhoto from "../essets/images/person.png";
import styles from "../essets/scss/Avatar.module.scss";

interface AvatarProps {
  photo: string | undefined;
  name: string | undefined;
  width?: string;
  className?: string;
  [key: string]: any;
}

function Avatar({
  photo = defaultPhoto,
  name = "프로필 이미지",
  width = "30px",
  className,
  ...otherProps
}: AvatarProps) {
  return (
    <img
      width={width}
      height={width}
      src={photo}
      alt={name}
      className={classNames(styles.avatar, className)}
      {...otherProps}
    />
  );
}

export default Avatar;
