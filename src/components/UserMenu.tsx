import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Avatar from "./Avatar";
import styles from "../essets/scss/UserMenu.module.scss";

interface UserMenuProps {
  onUpload: () => void;
  onSignout: () => void;
}

function UserMenu({ onUpload, onSignout }: UserMenuProps) {
  const { sessionId } = useAppSelector((state) => state.auth);
  const { me } = useAppSelector((state) => state.user);

  return (
    <>
      <div className={styles.header}>
        <Avatar photo={me.photoUrl} name={me.name} width="100px" />
        <span className={styles.name}>{me.name}</span>
        <Link to={`/${me._id}/post`} className={styles.profileBtn}>
          프로필
        </Link>
      </div>
      <ul className={styles.menu}>
        {sessionId ? (
          <>
            <li onClick={() => onUpload()}>게시물 등록</li>
            <li>메세지 보내기</li>
            <li onClick={() => onSignout()}>로그아웃</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default UserMenu;
