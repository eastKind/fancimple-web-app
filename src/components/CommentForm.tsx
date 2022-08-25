import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import Button from "./Button";
import styles from "../essets/scss/CommentForm.module.scss";
import { createComment } from "../redux/thunks/comment";
import Spinner from "./Spinner";

interface CommentFormProps {
  postId: string;
}

function CommentForm({ postId }: CommentFormProps) {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await dispatch(createComment({ postId, contents: value }));
    } catch (error: any) {
      alert(error.message);
    } finally {
      setValue("");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {isSubmitting ? (
        <div className={styles.spinner}>
          <Spinner size="18px" />
        </div>
      ) : (
        <textarea value={value} onChange={handleChange} />
      )}

      <Button type="submit" disabled={isSubmitting}>
        전송
      </Button>
    </form>
  );
}

export default CommentForm;
