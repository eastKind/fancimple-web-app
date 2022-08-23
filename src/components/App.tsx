import React, { useEffect, useCallback } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getMe } from "../redux/thunks/user";
import Nav from "./Nav";
import styles from "../essets/scss/App.module.scss";
import "../essets/scss/App.font.scss";

function App() {
  const dispatch = useAppDispatch();
  const { sessionId } = useAppSelector((state) => state.auth);
  const { me } = useAppSelector((state) => state.user);

  const handleLoad = useCallback(async () => {
    try {
      await dispatch(getMe());
    } catch (error: any) {
      alert(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    if (me._id) return;
    handleLoad();
  }, [me, handleLoad]);

  if (!sessionId) return <Navigate to="/signin" />;

  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
