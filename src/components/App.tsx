import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getMe } from "../redux/userSlice";
import Nav from "./Nav";
import styles from "./App.module.scss";

function App() {
  const { sessionId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sessionId) dispatch(getMe());
  }, [sessionId, dispatch]);

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
