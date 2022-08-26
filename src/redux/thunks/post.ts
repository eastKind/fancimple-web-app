import { createAsyncThunk } from "@reduxjs/toolkit";
import Post from "../../api/Post";
import type {
  GetPostsReqData,
  UpdatePostReqData,
  DeletePostReqData,
  LikesPostReqData,
} from "../../types";

export const getPosts = createAsyncThunk(
  "post/get",
  async (
    { cursor, limit, userId, bookmark }: GetPostsReqData,
    { rejectWithValue }
  ) => {
    try {
      if (userId) return await Post.getByUserId({ userId, cursor, limit });
      if (bookmark) return await Post.getBookmarks({ cursor, limit });
      return await Post.get({ cursor, limit });
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const createPost = createAsyncThunk(
  "post/create",
  async (reqData: FormData, { rejectWithValue }) => {
    try {
      return await Post.create(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/update",
  async (reqData: UpdatePostReqData, { rejectWithValue }) => {
    try {
      return await Post.update(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (reqData: DeletePostReqData, { rejectWithValue }) => {
    try {
      return await Post.delete(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const likesPost = createAsyncThunk(
  "post/likes",
  async (reqData: LikesPostReqData, { rejectWithValue }) => {
    try {
      return await Post.likes(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);
