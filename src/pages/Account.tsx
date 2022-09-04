import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { validate } from "../utils/validate";
import { editDesc, editName, editPassword } from "../redux/thunks/user";
import Container from "../components/Container";
import AvatarForm from "../components/AvatarForm";
import Button from "../components/Button";
import styles from "../essets/scss/Account.module.scss";
import Spinner from "../components/Spinner";

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

  const handleCautions = (key: "name" | "password", value: string) => {
    setCautions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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

  const handleBlurName = async () => {
    if (me.name === profile.name) return;
    const caution = validate("name", profile.name).name;
    if (!caution) {
      try {
        await dispatch(editName(profile.name)).unwrap();
      } catch (error: any) {
        alert(error.data);
        initialize();
      }
    } else {
      initialize();
      handleCautions("name", caution);
    }
  };

  const handleBlurDesc = async () => {
    if (me.desc === profile.desc) return;
    try {
      await dispatch(editDesc(profile.desc)).unwrap();
    } catch (error: any) {
      alert(error.data);
    }
  };

  const handleSubmit = async () => {
    const { current, next, confirm } = password;
    let caution = "";
    const hasEmpty = Object.values({ current, next, confirm }).some(
      (value) => value === ""
    );
    if (hasEmpty) {
      caution = "모든 칸을 입력해주세요.";
      return handleCautions("password", caution);
    }
    if (current === next) {
      caution = "현재 비밀번호와 다르게 입력해주세요.";
      return handleCautions("password", caution);
    }
    caution = validate("password", next).password;
    if (caution) {
      return handleCautions("password", caution);
    }
    if (next !== confirm) {
      caution = "비밀번호 확인이 일치하지 않습니다.";
      return handleCautions("password", caution);
    }
    try {
      await dispatch(editPassword({ current, next })).unwrap();
      alert("비밀번호가 변경 되었습니다.");
    } catch (error: any) {
      if (error.status === 400) alert(error.data);
    } finally {
      initialize();
    }
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
              autoComplete="off"
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
            <span className={styles.head}>비밀번호 변경</span>
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
            <Button onClick={handleSubmit} disabled={loading}>
              비밀번호 변경
            </Button>
          </div>
        </div>
        {loading && (
          <div className={styles.spinner}>
            <Spinner size={36} variant="inverse" />
          </div>
        )}
      </div>
    </Container>
  );
}

export default Account;
