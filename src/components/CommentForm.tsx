import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createComment } from "../redux/commentSlice";
import { MyParams } from "../types";
import Button from "./Button";
import styles from "./CommentForm.module.scss";

function CommentForm() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.comment);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createComment({ id, contents: value }));
    } catch (error: any) {
      alert(error.message);
    } finally {
      setValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <Button type="submit" disabled={loading}>
        버튼
      </Button>
    </form>
  );
}

export default CommentForm;
