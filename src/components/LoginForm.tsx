import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Button from "./Button";
import styles from "./LoginForm.module.scss";
import { login as loginAsync } from "../redux/authSlice";

const initialState = {
  email: "",
  password: "",
};

function LoginForm() {
  const [values, setValues] = useState(initialState);
  const dispatch = useAppDispatch();
  const { sessionId, loading } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginAsync(values));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (sessionId) return <Navigate to="/" />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>이메일</label>
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <label>비밀번호</label>
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <Button
        variant={undefined}
        className={undefined}
        as={undefined}
        type="submit"
        disabled={loading}
      >
        로그인
      </Button>
    </form>
  );
}

export default LoginForm;
