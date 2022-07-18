import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import styles from "./App.module.scss";

function App() {
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
