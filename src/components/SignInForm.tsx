import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Button from "./Button";
import styles from "./SignInForm.module.scss";
import { signin as signinAsync } from "../redux/authSlice";

const initialState = {
  email: "",
  password: "",
};

function SignInForm() {
  const [values, setValues] = useState(initialState);
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(signinAsync(values));
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

export default SignInForm;
