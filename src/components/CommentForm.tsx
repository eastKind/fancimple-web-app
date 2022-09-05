import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Button from "./Button";
import styles from "../essets/scss/CommentForm.module.scss";
import { createComment } from "../redux/thunks/comment";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

interface CommentFormProps {
  postId: string;
}

function CommentForm({ postId }: CommentFormProps) {
  const { sessionId } = useAppSelector((state) => state.auth);
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(createComment({ postId, contents: value }));
    setValue("");
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {isSubmitting ? (
        <div className={styles.spinner}>
          <Spinner size={18} />
        </div>
      ) : (
        <textarea
          placeholder={sessionId ? "댓글을 입력해주세요." : "로그인 해주세요."}
          value={value}
          onChange={handleChange}
          onClick={sessionId ? undefined : () => navigate("/signin")}
        />
      )}

      <Button type="submit" disabled={isSubmitting}>
        전송
      </Button>
    </form>
  );
}

export default CommentForm;
