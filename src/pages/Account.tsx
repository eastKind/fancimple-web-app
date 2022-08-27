import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { validate, validatePw } from "../utils/validate";
import { editDesc, editName, editPassword } from "../redux/thunks/user";
import Container from "../components/Container";
import AvatarForm from "../components/AvatarForm";
import Button from "../components/Button";
import styles from "../essets/scss/Account.module.scss";

const INIT_CAUTIONS = {
  name: "",
  password: "",
};

const INIT_PASSWORD = {
  current: "",
  next: "",
  confirm: "",
};

function Account() {
  const { me, loading, error } = useAppSelector((state) => state.user);
  const [profile, setProfile] = useState({ name: "", desc: "" });
  const [password, setPassword] = useState(INIT_PASSWORD);
  const [cautions, setCautions] = useState(INIT_CAUTIONS);
  const dispatch = useAppDispatch();

  const initialize = useCallback(() => {
    setProfile({ name: me.name, desc: me.desc });
    setPassword(INIT_PASSWORD);
    setCautions(INIT_CAUTIONS);
  }, [me]);

  const handleChange = (e: ChangeEvent) => {
    const { type, name, value } = e.target as HTMLInputElement;
    if (type === "password") {
      setPassword((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleBlurName = async (e: FocusEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    const caution = validate(name, value);
    if (!caution[name]) {
      try {
        await dispatch(editName(value)).unwrap();
      } catch (error: any) {
        alert(error.data);
        return initialize();
      }
    }
    setCautions((prev) => ({
      ...prev,
      ...caution,
    }));
  };

  const handleBlurDesc = async () => {
    try {
      await dispatch(editDesc(profile.desc)).unwrap();
    } catch (error: any) {
      alert(error.data);
    }
  };

  const handleSubmit = async () => {
    // const { current, next, confirm } = password;
    // const caution = validate("password", next);
    // // caution.password = validatePw(next, confirm).password2;
    // // if (!current) caution.password = "현재 비밀번호를 입력해주세요.";
    // if (!caution.password) {
    //   try {
    //     await dispatch(editPassword({ current, next })).unwrap();
    //   } catch (error: any) {
    //     alert(error.data);
    //   } finally {
    //     initialize();
    //   }
    // } else {
    //   setCautions((prev) => ({
    //     ...prev,
    //     ...caution,
    //   }));
    // }
  };

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.profileSection}>
          <AvatarForm user={me} />
          <div className={styles.profile}>
            <input
              type="text"
              name="name"
              value={profile.name}
              className={styles.name}
              onChange={handleChange}
              onBlur={handleBlurName}
            />
            {cautions.name && (
              <span className={styles.cautions}>{cautions.name}</span>
            )}
            <textarea
              name="desc"
              maxLength={100}
              value={profile.desc}
              placeholder="소개글"
              className={styles.desc}
              onChange={handleChange}
              onBlur={handleBlurDesc}
            />
          </div>
        </div>
        <div className={styles.passwordSection}>
          <div className={styles.header}>
            <h3>비밀번호 변경</h3>
            {cautions.password && (
              <span className={styles.cautions}>{cautions.password}</span>
            )}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              name="current"
              value={password.current}
              placeholder="현재 비밀번호"
              onChange={handleChange}
            />
            <input
              type="password"
              name="next"
              value={password.next}
              placeholder="비밀번호"
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirm"
              value={password.confirm}
              placeholder="비밀번호 확인"
              onChange={handleChange}
            />
          </div>
          <div className={styles.submitBtn}>
            <Button onClick={handleSubmit}>비밀번호 변경</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Account;
