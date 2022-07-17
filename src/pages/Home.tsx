import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

function Home() {
  const { sessionId } = useAppSelector((state) => state.auth);

  if (!sessionId) return <Navigate to="/signin" />;

  return (
    <div>
      <h1>Home</h1>
      <PostList />
      <PostForm />
    </div>
  );
}

export default Home;
