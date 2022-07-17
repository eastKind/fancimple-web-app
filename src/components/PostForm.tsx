import React, { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {

    // } catch (error: any) {
    //   alert(error.message);
    // }
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
      <Button variant={undefined} className={undefined} as={undefined}>
        등록
      </Button>
    </form>
  );
}

export default PostForm;
