import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import PostForm from "../components/PostForm";

function Home() {
  const { sessionId } = useAppSelector((state) => state.auth);

  if (!sessionId) return <Navigate to="/signin" />;

  return (
    <div>
      Home <PostForm />
    </div>
  );
}

export default Home;
