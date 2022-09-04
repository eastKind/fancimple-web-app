import React from "react";
import classNames from "classnames";
import styles from "../essets/scss/Spinner.module.scss";

interface SpinnerProps {
  size: number;
  className?: string;
  variant?: "inverse";
}

function Spinner({ size, className, variant }: SpinnerProps) {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    border: `${Math.round(size / 9)}px solid ${variant ? "#fff" : "#454545"}`,
    borderTopColor: "transparent",
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.spinner} style={style}></div>
    </div>
  );
}

export default Spinner;
