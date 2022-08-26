import React, { useState } from "react";
import { UserData } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { follow } from "../redux/thunks/user";
import useFollowState from "../hooks/useFollowState";
import AvatarForm from "./AvatarForm";
import Avatar from "./Avatar";
import Modal from "./Modal";
import Button from "./Button";
import UserList from "./UserList";
import styles from "../essets/scss/UserInfo.module.scss";

interface UserInfoProps {
  user: UserData;
  isMe: boolean;
}

function UserInfo({ user, isMe }: UserInfoProps) {
  const { loading } = useAppSelector((state) => state.user);
  const { isFollowed, setIsFollowed } = useFollowState(user._id);
  const [selectedList, setSelectedList] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleModal = () => setModalOpen((prev) => !prev);

  const handleClickFollow = async () => {
    setIsFollowed((prev) => !prev);
    await dispatch(follow({ userId: user._id, isFollowed }));
  };

  const handleClick = (e: React.MouseEvent) => {
    const { id } = e.target as HTMLSpanElement;
    if (!id) return;
    setSelectedList(id);
    handleModal();
  };

  return (
    <div className={styles.container}>
      {isMe ? (
        <AvatarForm user={user} />
      ) : (
        <Avatar
          photo={user.photoUrl}
          name={user.name}
          className={styles.avatar}
        />
      )}
      <div className={styles.infoContainer}>
        <div className={styles.header}>
          <p className={styles.name}>{user.name}</p>
          {isMe ? (
            <div className={styles.editBtn}>
              <span className="material-symbols-rounded">edit</span>
            </div>
          ) : (
            <Button
              onClick={handleClickFollow}
              className={styles.followBtn}
              variant="inverse"
              disabled={loading}
            >
              {isFollowed ? "팔로우 취소" : "팔로우"}
            </Button>
          )}
        </div>
        <div className={styles.counts} onClick={handleClick}>
          <span>게시물 {user.postCount}</span>
          <span id="follower">팔로워 {user.followers.length}</span>
          <span id="follow">팔로우 {user.followings.length}</span>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={handleModal}>
        <UserList
          userId={user._id}
          selectedList={selectedList}
          onClose={handleModal}
        />
      </Modal>
    </div>
  );
}

export default UserInfo;
