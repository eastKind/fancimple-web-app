import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signin } from "../redux/thunks/auth";
import Button from "./Button";
import Spinner from "./Spinner";
import styles from "../essets/scss/SignInForm.module.scss";

const initialState = {
  email: "",
  password: "",
};

function SignInForm() {
  const [values, setValues] = useState(initialState);
  const [cautions, setCautions] = useState(initialState);
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleValidate = () => {
    let isPass = true;
    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        setCautions((prev) => ({
          ...prev,
          [key]:
            key === "email"
              ? "이메일을 확인해주세요"
              : "비밀번호를 확인해주세요",
        }));
        isPass = false;
      }
    });
    setTimeout(() => {
      setCautions(initialState);
    }, 3000);
    return isPass;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isPass = handleValidate();
    if (isPass) {
      try {
        await dispatch(signin(values)).unwrap();
        navigate("/");
      } catch (error: any) {
        if (error.status === 400) alert(error.data);
      }
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
      <div className={styles.inputContainer}>
        <label>이메일</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="이메일을 입력해 주세요."
        />
        {cautions.email && <p className={styles.cautions}>{cautions.email}</p>}
      </div>
      <div className={styles.inputContainer}>
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해 주세요."
        />
        {cautions.password && (
          <p className={styles.cautions}>{cautions.password}</p>
        )}
      </div>
      <Button type="submit" disabled={loading} className={styles.btn}>
        {loading ? <Spinner size={21.6} variant="inverse" /> : "로그인"}
      </Button>
    </form>
  );
}

export default SignInForm;
