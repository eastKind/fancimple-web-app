import React from "react";
import { useAppDispatch } from "../redux/hooks";

interface OthersMenuProps {
  postId: string;
  writerId: string;
}

function OthersMenu({ postId, writerId }: OthersMenuProps) {
  const dispatch = useAppDispatch();

  return (
    <ul style={{ width: "150px" }}>
      <li>팔로우 취소</li>
      <li>즐겨찾기 등록</li>
      <li>공유하기</li>
      <li>링크 복사</li>
    </ul>
  );
}

export default OthersMenu;
