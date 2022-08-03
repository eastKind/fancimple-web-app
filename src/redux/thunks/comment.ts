import { createAsyncThunk } from "@reduxjs/toolkit";
import Comment from "../../api/Comment";
import {
  GetCommentsReqData,
  CreateCommentReqData,
  DeleteCommentReqData,
} from "../../types";

export const getComments = createAsyncThunk(
  "comment/get",
  async (reqData: GetCommentsReqData, { rejectWithValue }) => {
    try {
      return await Comment.get(reqData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/create",
  async (reqData: CreateCommentReqData, { rejectWithValue }) => {
    try {
      return await Comment.create(reqData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (reqData: DeleteCommentReqData, { rejectWithValue }) => {
    try {
      return await Comment.delete(reqData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
