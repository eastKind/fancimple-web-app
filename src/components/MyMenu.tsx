import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deletePost } from "../redux/thunks/post";
import { PostData } from "../types";
import Confirm from "./Confirm";
import Modal from "./Modal";
import DropDown from "./DropDown";
import Update from "../pages/Update";
import styles from "../essets/scss/PostMenu.module.scss";

interface MyMenuProps {
  post: PostData;
  isDropped: boolean;
  setDrop: Dispatch<SetStateAction<boolean>>;
}

function MyMenu({ post, isDropped, setDrop }: MyMenuProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { loading } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const handleConfirm = () => setConfirmOpen((prev) => !prev);
  const handleModal = () => setModalOpen((prev) => !prev);
  const handleDrop = () => setDrop((prev) => !prev);

  const handleDelete = async () => {
    await dispatch(deletePost({ postId: post._id }));
  };

  return (
    <>
      <DropDown isDropped={isDropped} setDrop={setDrop}>
        <ul className={styles.list} onClick={handleDrop}>
          <li onClick={handleConfirm}>삭제하기</li>
          <li onClick={handleModal}>수정하기</li>
          <li>좋아요 숨기기</li>
          <li>댓글 숨기기</li>
        </ul>
      </DropDown>
      <Confirm
        isOpen={confirmOpen}
        loading={loading}
        onCancel={handleConfirm}
        onConfirm={handleDelete}
      >
        <span>
          게시물이 삭제됩니다.
          <br />
          계속 하시겠습니까?
        </span>
      </Confirm>
      <Modal isOpen={modalOpen} onClose={handleModal}>
        <Update post={post} onCancel={handleModal} />
      </Modal>
    </>
  );
}

export default MyMenu;
