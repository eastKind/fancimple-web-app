import React from "react";
import { useAppDispatch } from "../redux/hooks";
import { deletePost } from "../redux/thunks/post";
import styles from "../essets/scss/PostMenu.module.scss";

interface MyMenuProps {
  postId: string;
}

function MyMenu({ postId }: MyMenuProps) {
  const dispatch = useAppDispatch();

  const handleDeleteClick = async () => {
    try {
      await dispatch(deletePost({ postId }));
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <ul className={styles.list}>
      <li onClick={handleDeleteClick}>
        <span>삭제하기</span>
      </li>
      <li>
        <span>수정하기</span>
      </li>
      <li>
        <span>좋아요 숨기기</span>
      </li>
      <li>
        <span>댓글 숨기기</span>
      </li>
    </ul>
  );
}

export default MyMenu;
