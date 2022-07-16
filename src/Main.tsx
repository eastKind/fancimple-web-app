import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import App from "./components/App";
import ErrorFallback from "./components/ErrorFallback";
import Home from "./pages/Home";
import Me from "./pages/Me";
import Other from "./pages/Other";
import SignIn from "./pages/SignIn";
import SingUp from "./pages/SingUp";

function Main() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="me" element={<Me />} />
            <Route path=":id" element={<Other />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SingUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default Main;
