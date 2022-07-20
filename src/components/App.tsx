import React, { useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getMe } from "../redux/authSlice";
import Nav from "./Nav";
import styles from "./App.module.scss";

function App() {
  const dispatch = useAppDispatch();
  const { sessionId } = useAppSelector((state) => state.auth);

  const handleLoad = useCallback(async () => {
    await dispatch(getMe());
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    handleLoad();
  }, [handleLoad]);

  return (
    <>
      <Nav />
      <div className={styles.body}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
