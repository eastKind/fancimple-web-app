import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { follow } from "../redux/thunks/user";
import { PostData } from "../types";
import DropDown from "./DropDown";
import styles from "../essets/scss/PostMenu.module.scss";

interface OthersMenuProps {
  post: PostData;
  isDropped: boolean;
  setDrop: Dispatch<SetStateAction<boolean>>;
}

function OthersMenu({ post, isDropped, setDrop }: OthersMenuProps) {
  const { writer } = post;
  const { me } = useAppSelector((state) => state.user);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useAppDispatch();

  const handleDrop = () => setDrop((prev) => !prev);

  const handleClickFollow = async () => {
    try {
      await dispatch(follow({ userId: writer._id, isFollowed }));
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    setIsFollowed(me.followings.includes(writer._id));
  }, [me.followings, writer._id]);

  return (
    <DropDown isDropped={isDropped} setDrop={setDrop}>
      <ul className={styles.list} onClick={handleDrop}>
        <li onClick={handleClickFollow}>
          <span>{isFollowed ? "팔로우 취소" : "팔로우"}</span>
        </li>
        <li>
          <span>즐겨찾기 등록</span>
        </li>
        <li>
          <span>공유하기</span>
        </li>
        <li>
          <span>링크 복사</span>
        </li>
      </ul>
    </DropDown>
  );
}

export default OthersMenu;
