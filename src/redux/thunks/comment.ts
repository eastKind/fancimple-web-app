import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCursor, setHasNext } from "../reducers/comment";
import Comment from "../../api/Comment";
import {
  GetCommentsReqData,
  CreateCommentReqData,
  DeleteCommentReqData,
} from "../../types";

export const getComments = createAsyncThunk(
  "comment/get",
  async ({ postId, cursor, limit }: GetCommentsReqData, { dispatch }) => {
    const { comments, hasNext } = await Comment.get({ postId, cursor, limit });
    const nextCursor =
      comments.length > 0 ? comments[comments.length - 1]._id : "";
    dispatch(setCursor(nextCursor));
    dispatch(setHasNext(hasNext));
    return comments;
  }
);

export const createComment = createAsyncThunk(
  "comment/create",
  async (arg: CreateCommentReqData) => {
    return await Comment.create(arg);
  }
);

export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (arg: DeleteCommentReqData) => {
    return await Comment.delete(arg);
  }
);
