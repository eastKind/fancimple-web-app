import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signout } from "../redux/thunks/auth";
import { initUser } from "../redux/reducers/user";
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
  const [show, setShow] = useState(false);
  const [drop, setDrop] = useState(false);
  const { me } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleShow = () => setShow(true);

  const handleDrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDrop((prev) => !prev);
  };

  const handleLogout = async () => {
    await dispatch(signout());
    dispatch(initUser());
    navigate("/signin");
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
          <li onClick={handleShow}>
            <span
              className={classNames("material-symbols-rounded", styles.symbols)}
            >
              add_circle
            </span>
          </li>
          <li onClick={handleDrop} className={styles.user}>
            <Avatar photo={me.photoUrl} name={me.name} />
            <DropDown show={drop} setShow={setDrop}>
              <ul className={styles.userMenu}>
                <li>
                  <Link to={`/${me._id}/post`} state={{ isMe: true }}>
                    프로필
                  </Link>
                </li>
                <li>
                  <Link to={`/${me._id}/bookmark`} state={{ isMe: true }}>
                    북마크
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <span>로그아웃</span>
                </li>
              </ul>
            </DropDown>
          </li>
        </ul>
      </Container>
      <Modal show={show} setShow={setShow}>
        <Upload />
      </Modal>
    </div>
  );
}

export default Nav;
