import React from "react";
import classNames from "classnames";
import styles from "../essets/scss/Container.module.scss";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className }: ContainerProps) {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
}

export default Container;
