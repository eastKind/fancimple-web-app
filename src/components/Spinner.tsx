import React from "react";
import styles from "../essets/scss/spinner.module.scss";

interface SpinnerProps {
  size: string;
  as?: "span";
}

function Spinner({ size, as }: SpinnerProps) {
  if (as) {
    return (
      <span
        className={styles.spinner}
        style={{ width: size, height: size }}
      ></span>
    );
  }

  return (
    <div className={styles.spinner} style={{ width: size, height: size }}></div>
  );
}

export default Spinner;
