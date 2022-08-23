import React from "react";
import classNames from "classnames";
import styles from "../essets/scss/spinner.module.scss";

interface SpinnerProps {
  size: string;
  className?: string;
  variant?: "inverse";
}

function Spinner({ size, className, variant }: SpinnerProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <div
        className={classNames(styles.spinner, variant && styles[variant])}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
}

export default Spinner;
