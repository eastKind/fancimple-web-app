import React from "react";
import styles from "../essets/scss/Interactions.module.scss";

interface InteractionsProps {
  onComment: () => void;
}

function Interactions({ onComment }: InteractionsProps) {
  const handleComment = () => onComment();

  return (
    <div className={styles.interactions}>
      <span className="material-symbols-rounded">favorite</span>
      <span className="material-symbols-rounded" onClick={handleComment}>
        mode_comment
      </span>
      <span className="material-symbols-rounded">bookmark</span>
    </div>
  );
}

export default Interactions;
