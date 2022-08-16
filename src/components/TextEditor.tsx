import React, { ChangeEvent } from "react";
import { useAppSelector } from "../redux/hooks";
import Avatar from "./Avatar";
import styles from "../essets/scss/TextEditor.module.scss";

interface TextEditorProps {
  texts: string;
  onChange: (texts: string) => void;
}

function TextEditor({ texts, onChange }: TextEditorProps) {
  const { me } = useAppSelector((state) => state.user);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = e.target.value;
    onChange(nextValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Avatar photo={me.photoUrl} name={me.name} />
        <span>{me.name}</span>
      </div>
      <div className={styles.body}>
        <textarea
          placeholder="내용을 입력해주세요."
          value={texts}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default TextEditor;
