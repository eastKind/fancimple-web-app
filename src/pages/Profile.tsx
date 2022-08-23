import React, { useEffect, useCallback, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { useParams, useLocation, Outlet, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/thunks/user";
import { GetUserReqData, MyParams } from "../types";
import Container from "../components/Container";
import photo from "../essets/images/person.png";
import styles from "../essets/scss/Profile.module.scss";

function Profile() {
  const location = useLocation();
  const { isMe } = location.state as { isMe: boolean };
  const { id } = useParams<keyof MyParams>() as MyParams;
  const user = useAppSelector((state) =>
    isMe ? state.user.me : state.user.other
  );
  const dispatch = useAppDispatch();

  const UserInfo = lazy(async () => {
    return await Promise.all([
      import("../components/UserInfo"),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]).then(([module]) => module);
  });

  const handleLoad = useCallback(
    async (options: GetUserReqData) => {
      try {
        await dispatch(getUser(options));
      } catch (error: any) {
        alert(error.message);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (isMe) return;
    handleLoad({ userId: id });
  }, [isMe, id, handleLoad]);

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
            <Suspense
              fallback={<img src={photo} alt="" className={styles.suspense} />}
            >
              <UserInfo user={user} isMe={isMe} />
            </Suspense>
          </div>
        </div>
        <div className={styles.body}>
          <Outlet context={{ userId: user._id }} />
        </div>
      </Container>
    </>
  );
}

export default Profile;
