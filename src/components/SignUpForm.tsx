import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signup } from "../redux/userSlice";
import { signin } from "../redux/authSlice";
import Button from "./Button";
import styles from "./SignUpForm.module.scss";

const initialState = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function SignUpForm() {
  const [values, setValues] = useState(initialState);
  const { loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const { name, email, password } = values;
      await dispatch(signup({ name, email, password }));
      await dispatch(signin({ email, password }));
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
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

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor="name">이름</label>
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
        <label htmlFor="email">이메일</label>
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
        <label htmlFor="password">비밀번호</label>
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
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
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
      <Button type="submit" disabled={loading}>
        회원 가입
      </Button>
    </form>
  );
}

export default SignUpForm;
