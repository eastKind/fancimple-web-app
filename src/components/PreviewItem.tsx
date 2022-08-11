import React from "react";
import styles from "../essets/scss/PreviewItem.module.scss";

interface PreviewItemProps {
  preview: string;
  value: number;
  isSelected: boolean;
}

function PreviewItem({ preview, value, isSelected }: PreviewItemProps) {
  return (
    <li className={styles.preview} value={value}>
      <img
        src={preview}
        alt={""}
        className={isSelected ? styles.selected : ""}
      />
    </li>
  );
}

export default PreviewItem;
