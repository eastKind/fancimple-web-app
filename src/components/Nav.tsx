import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signout } from "../redux/authSlice";
import styles from "../essets/scss/Nav.module.scss";

function Nav() {
  const { sessionId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    await dispatch(signout());
    navigate("/signin");
  };

  return (
    <div className={styles.nav}>
      Nav
      {sessionId ? (
        <button onClick={handleClick}>로그아웃</button>
      ) : (
        <Link to="/signin">로그인</Link>
      )}
    </div>
  );
}

export default Nav;
