import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signup as signupAsync } from "../redux/userSlice";
import Button from "./Button";
import styles from "./JoinForm.module.scss";

const initialState = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function JoinForm() {
  const [values, setValues] = useState(initialState);
  const dispatch = useAppDispatch();
  const { auth, user } = useAppSelector((state) => state);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const { name, email, password } = values;
    dispatch(signupAsync({ name, email, password }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (): void => {
    return;
  };

  const handleBlur = (): void => {
    return;
  };

  if (auth.sessionId) return <Navigate to="/" />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor="name"></label>
        <input
          id="name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="email"></label>
        <input
          id="email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password"></label>
        <input
          id="password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="passwordConfirm"></label>
        <input
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          value={values.passwordConfirm}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <Button
        variant={undefined}
        className={undefined}
        as={undefined}
        type="submit"
        disabled={user.loading}
      >
        회원 가입
      </Button>
    </form>
  );
}

export default JoinForm;
