import React from "react";
import classNames from "classnames";
import styles from "../essets/scss/spinner.module.scss";

interface SpinnerProps {
  size: string;
  className?: string;
  variant?: string;
}

function Spinner({ size, className, variant }: SpinnerProps) {
  return (
    <div className={styles.container}>
      <div
        className={classNames(
          styles.spinner,
          variant && styles[variant],
          className
        )}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
}

export default Spinner;
