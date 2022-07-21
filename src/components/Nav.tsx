import React from "react";
import { useNavigate, Link } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signout } from "../redux/authSlice";
import styles from "../essets/scss/Nav.module.scss";

interface NavProps {
  className?: string;
}

function Nav({ className }: NavProps) {
  const { sessionId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    await dispatch(signout());
    navigate("/signin");
  };

  return (
    <div className={classNames(styles.nav, className)}>
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
