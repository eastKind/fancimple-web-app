import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getHistories } from "../redux/thunks/search";
import { initSearch, clear } from "../redux/reducers/search";
import Container from "./Container";
import Modal from "./Modal";
import Upload from "../pages/Upload";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import logo from "../essets/images/logo.png";
import DropDown from "./DropDown";
import SearchList from "./SearchList";
import styles from "../essets/scss/Nav.module.scss";

interface NavProps {
  className?: string;
}

function Nav({ className }: NavProps) {
  const { sessionId } = useAppSelector((state) => state.auth);
  const [keyword, setKeyword] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [drop, setDrop] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDrop = () => setDrop((prev) => !prev);

  const handleChange = (value: string) => setKeyword(value);

  const handleSearchModal = () => setSearchModal((prev) => !prev);

  const handleUploadModal = () => {
    if (!sessionId) {
      alert("로그인이 필요한 서비스입니다.");
      return navigate("/signin");
    }
    setUploadModal((prev) => !prev);
  };

  const handleClear = () => {
    setKeyword("");
    dispatch(clear());
  };

  useEffect(() => {
    if (!sessionId) return;
    dispatch(getHistories());
    return () => {
      dispatch(initSearch());
    };
  }, [sessionId, dispatch]);

  return (
    <div className={classNames(styles.nav, className)}>
      <Container className={styles.container}>
        <span
          className={classNames(
            "material-symbols-rounded",
            styles.searchBtn,
            styles.symbols
          )}
          onClick={handleSearchModal}
        >
          manage_search
        </span>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="fancimple" />
        </Link>
        <div className={styles.search}>
          <SearchBar
            keyword={keyword}
            onChange={handleChange}
            onDrop={handleDrop}
            onClear={handleClear}
          />
          <DropDown isDropped={drop} setDrop={setDrop}>
            <div className={styles.searchList}>
              <SearchList
                keyword={keyword}
                onClear={handleClear}
                onDrop={handleDrop}
              />
            </div>
          </DropDown>
        </div>
        <ul className={styles.menu}>
          <li className={styles.homeBtn}>
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
          <li onClick={handleUploadModal} className={styles.uploadBtn}>
            <span
              className={classNames("material-symbols-rounded", styles.symbols)}
            >
              add_circle
            </span>
          </li>
          <li>
            <UserMenu />
          </li>
        </ul>
      </Container>
      <Modal isOpen={uploadModal} onClose={handleUploadModal}>
        <Upload />
      </Modal>
      <Modal isOpen={searchModal} onClose={handleSearchModal}>
        <div className={styles.searchModal}>
          <div className={styles.searchBar}>
            <SearchBar
              keyword={keyword}
              onChange={handleChange}
              onClear={handleClear}
            />
          </div>
          <div className={styles.list}>
            <SearchList
              keyword={keyword}
              onClear={handleClear}
              onModal={handleSearchModal}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Nav;
