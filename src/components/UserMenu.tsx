import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { signout } from "../redux/thunks/auth";
import { initMe } from "../redux/reducers/user";
import Avatar from "./Avatar";
import DropDown from "./DropDown";
import styles from "../essets/scss/UserMenu.module.scss";

function UserMenu() {
  const [drop, setDrop] = useState(false);
  const { sessionId } = useAppSelector((state) => state.auth);
  const { me } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleDrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDrop((prev) => !prev);
  };

  const handleLogout = async () => {
    await dispatch(signout());
    dispatch(initMe());
  };

  return (
    <div className={styles.container}>
      <Avatar photo={me.photoUrl} name={me.name} onClick={handleDrop} />
      <DropDown isDropped={drop} setDrop={setDrop}>
        <ul className={styles.userMenu} onClick={handleDrop}>
          {sessionId ? (
            <>
              <li>
                <Link to={`/${me._id}/post`}>프로필</Link>
              </li>
              <li>
                <Link to={`/${me._id}/bookmark`}>북마크</Link>
              </li>
              <li onClick={handleLogout}>
                <span>로그아웃</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={`/signin`}>로그인</Link>
              </li>
              <li>
                <Link to={`/signup`}>회원가입</Link>
              </li>
            </>
          )}
        </ul>
      </DropDown>
    </div>
  );
}

export default UserMenu;
