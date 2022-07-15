import React from "react";
import { Link } from "react-router-dom";
import JoinForm from "../components/JoinForm";
import styles from "./SignUp.module.scss";

function SingUp() {
  return (
    <div className={styles.container}>
      <Link to="/">LOGO</Link>
      <div className={styles.signin}>
        <span>이미 회원이신가요?</span>
        <Link to="/signin">로그인 하기</Link>
      </div>
      <JoinForm />
    </div>
  );
}

export default SingUp;
