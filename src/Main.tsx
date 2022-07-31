import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Bookmark from "./pages/Bookmark";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileHome from "./pages/ProfileHome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<Profile />}>
            <Route index element={<ProfileHome />} />
            <Route path="bookmark" element={<Bookmark />} />
          </Route>
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
