import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import SignInForm from "../components/SignInForm";
import logo from "../essets/images/logo.png";
import styles from "../essets/scss/SignIn.module.scss";

function SignIn() {
  const { sessionId } = useAppSelector((state) => state.auth);

  if (sessionId) return <Navigate to="/" />;

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="fancimple" />
      </Link>
      <div className={styles.signup}>
        <span>아직 회원이 아니신가요? </span>
        <Link to="/signup">회원가입 하기</Link>
      </div>
      <SignInForm />
      <div className={styles.find}>
        <Link to="/">비밀번호 찾기</Link>
      </div>
    </div>
  );
}

export default SignIn;
