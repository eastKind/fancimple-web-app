import React, { useState } from "react";
import classNames from "classnames";
import { useAppDispatch } from "../redux/hooks";
import { deletePost } from "../redux/thunks/post";
import Confirm from "./Confirm";
import styles from "../essets/scss/PostMenu.module.scss";

interface MyMenuProps {
  postId: string;
}

function MyMenu({ postId }: MyMenuProps) {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    await dispatch(deletePost({ postId }));
  };

  return (
    <>
      <ul className={classNames(styles.list, show && styles.hide)}>
        <li onClick={handleShow}>
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
      <Confirm show={show} setShow={setShow} onConfirm={handleDelete}>
        <span>
          게시물이 삭제됩니다.
          <br />
          계속 하시겠습니까?
        </span>
      </Confirm>
    </>
  );
}

export default MyMenu;
