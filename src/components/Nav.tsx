import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getHistories } from "../redux/thunks/search";
import { signout } from "../redux/thunks/auth";
import { initSearch, clear } from "../redux/reducers/search";
import { initMe } from "../redux/reducers/user";
import Container from "./Container";
import Modal from "./Modal";
import Upload from "../pages/Upload";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";
import DropDown from "./DropDown";
import Offcanvas from "./Offcanvas";
import SearchList from "./SearchList";
import logo from "../essets/images/logo.png";
import styles from "../essets/scss/Nav.module.scss";

interface NavProps {
  className?: string;
}

function Nav({ className }: NavProps) {
  const { sessionId } = useAppSelector((state) => state.auth);
  const { me } = useAppSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");
  const [modal, setModal] = useState(false);
  const [offcanvas, setOffcanvas] = useState(false);
  const [dropSearch, setDropSearch] = useState(false);
  const [dropMenu, setDropMenu] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDropMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropMenu((prev) => !prev);
  };

  const handleSignout = async () => {
    await dispatch(signout());
    dispatch(initMe());
  };

  const handleDropSearch = () => {
    setDropSearch(true);
  };

  const handleChange = (value: string) => {
    setKeyword(value);
  };

  const handleOffcanvas = () => {
    setOffcanvas((prev) => !prev);
  };

  const handleModal = () => {
    if (!sessionId) {
      alert("로그인이 필요한 서비스입니다.");
      return navigate("/signin");
    }
    setModal((prev) => !prev);
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
          onClick={handleOffcanvas}
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
            onDrop={handleDropSearch}
            onClear={handleClear}
            className={styles.searchBar}
          />
          <DropDown isDropped={dropSearch} setDrop={setDropSearch}>
            <SearchList
              keyword={keyword}
              onDrop={handleDropSearch}
              onClear={handleClear}
              className={styles.searchList}
            />
          </DropDown>
        </div>
        <ul className={styles.menu}>
          <li className={styles.toFoot}>
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
          <li onClick={handleModal} className={styles.toFoot}>
            <span
              className={classNames("material-symbols-rounded", styles.symbols)}
            >
              add_circle
            </span>
          </li>
          <li className={styles.toFoot}>
            <span
              className={classNames("material-symbols-rounded", styles.symbols)}
            >
              favorite
            </span>
          </li>
          <li>
            <Avatar
              photo={me.photoUrl}
              name={me.name}
              onClick={handleDropMenu}
              className={styles.avatar}
            />
            <DropDown isDropped={dropMenu} setDrop={setDropMenu}>
              <ul className={styles.userMenu} onClick={handleDropMenu}>
                <li>
                  <Link to={sessionId ? `/${me._id}/post` : `/signin`}>
                    {sessionId ? "프로필" : "로그인"}
                  </Link>
                </li>
                <li>
                  <Link to={sessionId ? `/${me._id}/bookmark` : "/signup"}>
                    {sessionId ? "북마크" : "회원가입"}
                  </Link>
                </li>
                {sessionId && (
                  <li onClick={handleSignout}>
                    <span>로그아웃</span>
                  </li>
                )}
              </ul>
            </DropDown>
          </li>
        </ul>
      </Container>
      <Modal isOpen={modal} onClose={handleModal}>
        <Upload />
      </Modal>
      <Offcanvas
        isOpen={offcanvas}
        onClose={handleOffcanvas}
        direction="left"
        className={styles.offcanvas}
      >
        <SearchBar
          keyword={keyword}
          onChange={handleChange}
          onClear={handleClear}
          className={styles.searchBar}
        />
        <SearchList
          keyword={keyword}
          onClear={handleClear}
          onModal={handleOffcanvas}
          className={styles.searchList}
        />
      </Offcanvas>
    </div>
  );
}

export default Nav;
