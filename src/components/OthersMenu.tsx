import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { follow } from "../redux/thunks/user";
import styles from "../essets/scss/PostMenu.module.scss";

interface OthersMenuProps {
  postId: string;
  writerId: string;
}

function OthersMenu({ postId, writerId }: OthersMenuProps) {
  const { me } = useAppSelector((state) => state.user);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useAppDispatch();

  const handleClickFollow = async () => {
    try {
      await dispatch(follow({ userId: writerId, isFollowed }));
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    setIsFollowed(me.followings.includes(writerId));
  }, [me.followings, writerId]);

  return (
    <ul className={styles.list}>
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
  );
}

export default OthersMenu;
