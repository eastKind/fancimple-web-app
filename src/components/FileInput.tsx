import React, { useEffect, useState, useRef } from "react";
import styles from "../essets/scss/FileInput.module.scss";

interface FileInputProps {
  name: string;
  value: FileList | null;
  onChange: (name: string, nextValue: FileList | null) => void;
  initialPreviews: string[] | undefined;
}

function FileInput({ name, value, onChange, initialPreviews }: FileInputProps) {
  const [previews, setPreviews] = useState(initialPreviews);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const nextValue = e.target.files;
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (inputNode) {
      inputNode.value = "";
      onChange(name, null);
    }
  };

  useEffect(() => {
    if (!value) return;
    const nextPreviews = [...value].map((file) => URL.createObjectURL(file));
    setPreviews(nextPreviews);

    return () => {
      nextPreviews.forEach((preview) => URL.revokeObjectURL(preview));
      setPreviews(initialPreviews);
    };
  }, [value, initialPreviews]);

  return (
    <div className={styles.inputContainer}>
      {previews?.map((preview, index) => (
        <img key={index} src={preview} alt="preview" />
      ))}
      <label htmlFor="files">이미지</label>
      <input
        id="files"
        type="file"
        accept="image/png, image/jpeg"
        multiple
        ref={inputRef}
        onChange={handleChange}
      />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
