import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signin } from "../redux/authSlice";
import Button from "./Button";
import Spinner from "./Spinner";
import styles from "../essets/scss/SignInForm.module.scss";

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
      await dispatch(signin(values)).unwrap();
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
      <Button type="submit" disabled={loading}>
        {loading ? <Spinner size="14px" /> : "로그인"}
      </Button>
    </form>
  );
}

export default SignInForm;
