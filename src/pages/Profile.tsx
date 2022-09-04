import React, { useEffect, useCallback } from "react";
import { useParams, Outlet, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useIsMe from "../hooks/useIsMe";
import { initUser } from "../redux/reducers/user";
import { getUser } from "../redux/thunks/user";
import { MyParams } from "../types";
import Container from "../components/Container";
import UserInfo from "../components/UserInfo";
import Spinner from "../components/Spinner";
import NotFound from "./NotFound";
import styles from "../essets/scss/Profile.module.scss";

function Profile() {
  const { id } = useParams<keyof MyParams>() as MyParams;
  const { user, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const isMe = useIsMe(id);

  const handleLoad = useCallback(
    async (userId: string) => {
      await dispatch(getUser({ userId }));
    },
    [dispatch]
  );

  useEffect(() => {
    handleLoad(id);
    return () => {
      dispatch(initUser());
    };
  }, [id, handleLoad, dispatch]);

  if (error?.status === 404) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>{user.name} - fancimple</title>
      </Helmet>
      <Container className={styles.container}>
        <div className={styles.header}>
          <ul className={styles.nav}>
            <li>
              <NavLink
                to={`/${id}/post`}
                className={({ isActive }) => (isActive ? styles.active : "")}
                state={{ isMe }}
              >
                게시물
              </NavLink>
            </li>
            {isMe && (
              <li>
                <NavLink
                  to={`/${id}/bookmark`}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  state={{ isMe }}
                >
                  북마크
                </NavLink>
              </li>
            )}
          </ul>
          <div className={styles.userInfo}>
            {loading && !user._id ? (
              <div className={styles.spinner}>
                <Spinner size={27} />
              </div>
            ) : (
              <UserInfo user={user} isMe={isMe} />
            )}
          </div>
        </div>
        <div className={styles.body}>
          <Outlet />
        </div>
      </Container>
    </>
  );
}

export default Profile;
