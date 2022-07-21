import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signup } from "../redux/userSlice";
import { signin } from "../redux/authSlice";
import { validate, validatePw } from "../utils/validate";
import { ValidateFn } from "../types";
import Button from "./Button";
import styles from "../essets/scss/SignUpForm.module.scss";

interface InitialState {
  [key: string]: string;
}

const initialState: InitialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

function SignUpForm() {
  const { loading } = useAppSelector((state) => state.user);
  const [values, setValues] = useState(initialState);
  const [cautions, setCautions] = useState(initialState);
  const [focus, setFocus] = useState(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleValidate = (
    validateFn: ValidateFn,
    ...options: [string, string]
  ) => {
    setCautions((prev) => ({
      ...prev,
      ...validateFn(...options),
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const invalidKey = Object.keys(cautions).find((key) => {
        return !(cautions[key] === "" && values[key]);
      });
      if (!invalidKey) {
        const { name, email, password } = values;
        await dispatch(signup({ name, email, password }));
        await dispatch(signin({ email, password }));
        return navigate("/");
      }
      if (invalidKey !== "password2") {
        handleValidate(validate, invalidKey, values[invalidKey]);
      }
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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    setFocus((prev) => ({
      ...prev,
      [e.target.name]: "focus",
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name !== "password2") {
      handleValidate(validate, name, value);
    }
    if (!value) {
      setFocus((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  useEffect(() => {
    handleValidate(validatePw, values.password, values.password2);
  }, [values.password, values.password2]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor="name" className={focus.name ? styles.focused : ""}>
          이름
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {cautions.name && <p>{cautions.name}</p>}
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="email" className={focus.email ? styles.focused : ""}>
          이메일
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {cautions.email && <p>{cautions.email}</p>}
      </div>
      <div className={styles.inputContainer}>
        <label
          htmlFor="password"
          className={focus.password ? styles.focused : ""}
        >
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {cautions.password && <p>{cautions.password}</p>}
      </div>
      <div className={styles.inputContainer}>
        <label
          htmlFor="password2"
          className={focus.password2 ? styles.focused : ""}
        >
          비밀번호 확인
        </label>
        <input
          id="password2"
          type="password"
          name="password2"
          value={values.password2}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {cautions.password2 && <p>{cautions.password2}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        회원 가입
      </Button>
    </form>
  );
}

export default SignUpForm;
