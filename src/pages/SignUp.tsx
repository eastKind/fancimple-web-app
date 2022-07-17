import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import SignUpForm from "../components/SignUpForm";
import styles from "./SignUp.module.scss";

function SingUp() {
  const { sessionId } = useAppSelector((state) => state.auth);

  if (sessionId) return <Navigate to="/" />;

  return (
    <div className={styles.container}>
      <Link to="/">LOGO</Link>
      <div className={styles.signin}>
        <span>이미 회원이신가요?</span>
        <Link to="/signin">로그인 하기</Link>
      </div>
      <SignUpForm />
    </div>
  );
}

export default SingUp;
