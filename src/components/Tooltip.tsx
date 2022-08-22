import React, { useEffect, ReactNode } from "react";
import classNames from "classnames";
import styles from "../essets/scss/Tooltip.module.scss";

interface TooltipProps {
  onClose: () => void;
  children: ReactNode;
  className?: string;
  variant?: "inverse";
}

function Tooltip({ onClose, children, className, variant }: TooltipProps) {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 7000);
  }, [onClose]);

  return (
    <div
      className={classNames(
        styles.container,
        className,
        variant && styles[variant]
      )}
    >
      {children}
    </div>
  );
}

export default Tooltip;
