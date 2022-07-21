import React from "react";
import classNames from "classnames";
import styles from "../essets/scss/Button.module.scss";

interface ButtonProps {
  variant?: string;
  className?: string;
  as?: string;
  [key: string]: any;
}

function Button({ variant, className, as, ...restProps }: ButtonProps) {
  if (as === "div") {
    return (
      <div
        {...restProps}
        className={classNames(
          styles.button,
          variant && styles[variant],
          className
        )}
      />
    );
  }

  return (
    <button
      {...restProps}
      className={classNames(
        styles.button,
        variant && styles[variant],
        className
      )}
    />
  );
}

export default Button;
