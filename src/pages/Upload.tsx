import React, { useState, useEffect } from "react";
import classNames from "classnames";
import ImageEditor from "../components/ImageEditor";
import styles from "../essets/scss/Upload.module.scss";

interface Values {
  files: FileList | null;
  texts: string;
}

const INIT_VALUES: Values = {
  files: null,
  texts: "",
};

function Upload() {
  const [values, setValues] = useState(INIT_VALUES);
  const [open, setOpen] = useState(false);

  const handleImageChange = (files: FileList) => {
    setValues((prev) => ({
      ...prev,
      files,
    }));
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
        <div className={styles.imageSection}>
          <ImageEditor files={values.files} onChange={handleImageChange} />
        </div>
        <div className={classNames(styles.textSection, open && styles.open)}>
          text-section
        </div>
      </div>
    </div>
  );
}

export default Upload;
