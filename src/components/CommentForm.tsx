import React, { useState } from "react";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { MyParams, CommentData, CommentReqData } from "../types";
import Button from "./Button";
import styles from "../essets/scss/CommentForm.module.scss";

interface CommentFormProps {
  onSubmit: (
    arg: CommentReqData
  ) => AsyncThunkAction<CommentData, CommentReqData, Record<string, never>>;
  onCancle?: () => void;
  initialValue?: string;
  editingId?: string;
}

function CommentForm({
  onSubmit,
  onCancle,
  initialValue = "",
  editingId,
}: CommentFormProps) {
  const { loading } = useAppSelector((state) => state.comment);
  const [value, setValue] = useState(initialValue);
  const { id } = useParams<keyof MyParams>() as MyParams;
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(onSubmit({ id: editingId || id, contents: value }));
      if (onCancle) onCancle();
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
        전송
      </Button>
      {onCancle && (
        <Button onClick={onCancle} type="button">
          취소
        </Button>
      )}
    </form>
  );
}

export default CommentForm;
