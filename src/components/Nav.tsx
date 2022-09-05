import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signout } from "../redux/thunks/auth";
import { initMe } from "../redux/reducers/user";
import Container from "./Container";
import Modal from "./Modal";
import Avatar from "./Avatar";
import DropDown from "./DropDown";
import Upload from "../pages/Upload";
import logo from "../essets/images/logo.png";
import styles from "../essets/scss/Nav.module.scss";

interface NavProps {
  className?: string;
}

function Nav({ className }: NavProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const { sessionId } = useAppSelector((state) => state.auth);
  const { me } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUpload = () => {
    if (!sessionId) {
      alert("로그인이 필요한 서비스입니다.");
      return navigate("/signin");
    }
    setModalOpen((prev) => !prev);
  };

  const handleDrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDrop((prev) => !prev);
  };

  const handleLogout = async () => {
    await dispatch(signout());
    dispatch(initMe());
  };

  return (
    <div className={classNames(styles.nav, className)}>
      <Container className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="fancimple" />
        </Link>
        <ul className={styles.menu}>
          <li>
            <Link to="/">
              <span
                className={classNames(
                  "material-symbols-rounded",
                  styles.symbols
                )}
              >
                home
              </span>
            </Link>
          </li>
          <li onClick={handleUpload}>
            <span
              className={classNames("material-symbols-rounded", styles.symbols)}
            >
              add_circle
            </span>
          </li>
          <li onClick={handleDrop} className={styles.user}>
            <Avatar photo={me.photoUrl} name={me.name} />
            <DropDown isDropped={drop} setDrop={setDrop}>
              {sessionId ? (
                <ul className={styles.userMenu} onClick={handleDrop}>
                  <li>
                    <Link to={`/${me._id}/post`}>프로필</Link>
                  </li>
                  <li>
                    <Link to={`/${me._id}/bookmark`}>북마크</Link>
                  </li>
                  <li onClick={handleLogout}>
                    <span>로그아웃</span>
                  </li>
                </ul>
              ) : (
                <ul className={styles.userMenu} onClick={handleDrop}>
                  <li>
                    <Link to={`/signin`}>로그인</Link>
                  </li>
                  <li>
                    <Link to={`/signup`}>회원가입</Link>
                  </li>
                </ul>
              )}
            </DropDown>
          </li>
        </ul>
      </Container>
      <Modal isOpen={modalOpen} onClose={handleUpload}>
        <Upload />
      </Modal>
    </div>
  );
}

export default Nav;
