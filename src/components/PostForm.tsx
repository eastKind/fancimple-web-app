import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { createPost } from "../redux/postSlice";
import Button from "./Button";
import FileInput from "./FileInput";
import styles from "./PostForm.module.scss";

type Values = {
  title: string;
  contents: string;
  files: FileList | null;
};

const initialState: Values = {
  title: "",
  contents: "",
  files: null,
};

function PostForm() {
  const [values, setValues] = useState(initialState);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("contents", values.contents);
      if (values.files !== null) {
        [...values.files].forEach((file) => {
          formData.append("image", file);
        });
      }
      await dispatch(createPost(formData));
    } catch (error: any) {
      alert(error.message);
    } finally {
      setValues(initialState);
    }
  };

  const handleChange = <T extends string, K>(name: T, value: K): void => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          name="title"
          value={values.title}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="contents">내용</label>
        <input
          id="contents"
          type="text"
          name="contents"
          value={values.contents}
          onChange={handleInputChange}
        />
      </div>
      <FileInput
        name="files"
        value={values.files}
        onChange={handleChange}
        initialPreviews={undefined}
      />
      <Button type="submit">등록</Button>
    </form>
  );
}

export default PostForm;
