import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { getComments, createComment } from "../redux/commentSlice";
import { MyParams } from "../types";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

function Post() {
  const { id } = useParams<keyof MyParams>() as MyParams;
  const dispatch = useAppDispatch();

  const handleLoad = useCallback(async () => {
    await dispatch(getComments({ id, cursor: "", limit: 10 }));
  }, []);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <div>
      {id}
      <CommentForm onSubmit={createComment} />
      <CommentList />
    </div>
  );
}

export default Post;
