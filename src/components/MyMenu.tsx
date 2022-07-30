import React from "react";
import { useAppDispatch } from "../redux/hooks";
import { deletePost } from "../redux/thunks/post";

interface MyMenuProps {
  postId: string;
}

function MyMenu({ postId }: MyMenuProps) {
  const dispatch = useAppDispatch();

  const handleDeleteClick = async () => {
    await dispatch(deletePost({ postId }));
  };

  return (
    <ul style={{ width: "150px" }}>
      <li onClick={handleDeleteClick}>삭제하기</li>
      <li>수정하기</li>
      <li>좋아요 숨기기</li>
      <li>댓글 숨기기</li>
    </ul>
  );
}

export default MyMenu;
