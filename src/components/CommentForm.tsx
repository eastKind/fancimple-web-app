import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Button from "./Button";
import styles from "../essets/scss/CommentForm.module.scss";
import { createComment } from "../redux/commentSlice";

interface CommentFormProps {
  postId: string;
}

function CommentForm({ postId }: CommentFormProps) {
  const [value, setValue] = useState("");
  const { loading } = useAppSelector((state) => state.comment);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createComment({ postId, contents: value }));
    } catch (error: any) {
      alert(error.message);
    } finally {
      setValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea value={value} onChange={handleChange} />
      <Button type="submit" disabled={loading}>
        전송
      </Button>
    </form>
  );
}

export default CommentForm;
