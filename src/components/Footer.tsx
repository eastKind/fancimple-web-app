import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAppSelector } from "../redux/hooks";
import Container from "./Container";
import Modal from "./Modal";
import Upload from "../pages/Upload";
import styles from "../essets/scss/Footer.module.scss";

interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps) {
  const [modal, setModal] = useState(false);
  const { sessionId } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleModal = () => {
    if (!sessionId) {
      alert("로그인이 필요한 서비스입니다.");
      return navigate("/signin");
    }
    setModal((prev) => !prev);
  };

  return (
    <div className={classNames(styles.footer, className)}>
      <Container className={styles.container}>
        <ul className={styles.menu}>
          <li>
            <Link to="/">
              <span
                className={classNames(
                  "material-symbols-rounded",
                  styles.symbols
                )}
              >
                home
              </span>
            </Link>
          </li>
          <li onClick={handleModal}>
            <span
              className={classNames("material-symbols-rounded", styles.symbols)}
            >
              add_circle
            </span>
          </li>
          <li>
            <span
              className={classNames("material-symbols-rounded", styles.symbols)}
            >
              favorite
            </span>
          </li>
        </ul>
      </Container>
      <Modal isOpen={modal} onClose={handleModal}>
        <Upload />
      </Modal>
    </div>
  );
}

export default Footer;
