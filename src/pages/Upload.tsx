import React, { useState, useEffect } from "react";
import classNames from "classnames";
import ImageEditor from "../components/ImageEditor";
import styles from "../essets/scss/Upload.module.scss";

function Upload() {
  const [files, setFiles] = useState<File[] | null>(null);
  const [texts, setTexts] = useState("");
  const [open, setOpen] = useState(false);

  const handleImageChange = (nextFiles: FileList) => {
    if (!files) {
      setFiles([...nextFiles]);
    } else {
      setFiles([...files, ...nextFiles]);
    }
  };

  const handleImageDelete = (index: number) => {
    if (!files) return;
    const nextFiles = files.filter((_, i) => i !== index);
    setFiles(nextFiles);
  };

  const handleCancle = () => {
    return;
  };
  const handleSubmit = () => {
    return;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span onClick={open ? () => setOpen(false) : handleCancle}>이전</span>
        <span onClick={open ? handleSubmit : () => setOpen(true)}>
          {open ? "완료" : "다음"}
        </span>
      </div>
      <div className={styles.body}>
        <ImageEditor
          files={files}
          onChange={handleImageChange}
          onDelete={handleImageDelete}
        />
        <div className={classNames(styles.textSection, open && styles.open)}>
          text-section
        </div>
      </div>
    </div>
  );
}

export default Upload;
