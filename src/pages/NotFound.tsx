import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Button from "../components/Button";
import styles from "../essets/scss/NotFound.module.scss";

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.warn}>
        <h1>존재하지 않는 페이지입니다.</h1>
        <p>올바른 주소인지 다시 한 번 확인해주세요.</p>
        <div className={styles.link}>
          <Link to="/">
            <Button>홈으로 가기</Button>
          </Link>
        </div>
      </div>
      <span className={classNames("material-symbols-rounded", styles.symbol)}>
        error
      </span>
    </div>
  );
}

export default NotFound;
