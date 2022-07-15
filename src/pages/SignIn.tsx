import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import styles from "./SignIn.module.scss";

function SignIn() {
  return (
    <div className={styles.container}>
      <Link to="/">LOGO</Link>
      <div className={styles.signup}>
        <span>아직 회원이 아니신가요?</span>
        <Link to="/signup">회원가입 하기</Link>
      </div>
      <LoginForm />
      <div className={styles.find}>
        <Link to="/">비밀번호 찾기</Link>
      </div>
    </div>
  );
}

export default SignIn;
