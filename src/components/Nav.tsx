import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signout } from "../redux/authSlice";
import Container from "./Container";
import Avatar from "./Avatar";
import DropDown from "./DropDown";
import logo from "../essets/images/logo.png";
import styles from "../essets/scss/Nav.module.scss";

interface NavProps {
  className?: string;
}

function Nav({ className }: NavProps) {
  const [drop, setDrop] = useState(false);
  const { userData: user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDrop((prev) => !prev);
  };

  const handleLogout = async () => {
    await dispatch(signout());
    navigate("/signin");
  };

  return (
    <div className={classNames(styles.nav, className)}>
      <Container className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="fancimple" />
        </Link>
        {/* <div className={styles.logo}>FANCIMPLE</div> */}
        <ul className={styles.menu}>
          <li>
            <Link to="/">
              <span className="material-symbols-rounded">home</span>
            </Link>
          </li>
          <li>
            <span className="material-symbols-rounded">add_circle</span>
          </li>
          <li className={styles.userMenu} onClick={handleClick}>
            <Avatar photo={user?.photoUrl} name={user?.name} />
            <DropDown show={drop} setShow={setDrop} className={styles.dropDown}>
              <Link to={`/${user?._id}`}>
                <li>프로필</li>
              </Link>
              <li onClick={handleLogout}>로그아웃</li>
            </DropDown>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
