import { createAsyncThunk } from "@reduxjs/toolkit";
import Comment from "../../api/Comment";
import {
  GetCommentsReqData,
  CreateCommentReqData,
  DeleteCommentReqData,
} from "../../types";

export const getComments = createAsyncThunk(
  "comment/get",
  async ({ postId, cursor, limit }: GetCommentsReqData, { dispatch }) => {
    const responseData = await Comment.get({ postId, cursor, limit });
    return responseData;
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
