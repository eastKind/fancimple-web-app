import { createAsyncThunk } from "@reduxjs/toolkit";
import Post from "../../api/Post";
import {
  GetPostsReqData,
  UpdatePostReqData,
  DeletePostReqData,
  LikesPostReqData,
} from "../../types";

export const getPosts = createAsyncThunk(
  "post/get",
  async (reqData: GetPostsReqData, { rejectWithValue }) => {
    try {
      return await Post.get(reqData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  "post/create",
  async (reqData: FormData, { rejectWithValue }) => {
    try {
      return await Post.create(reqData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/update",
  async (reqData: UpdatePostReqData, { rejectWithValue }) => {
    try {
      return await Post.update(reqData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (reqData: DeletePostReqData, { rejectWithValue }) => {
    try {
      return await Post.delete(reqData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likesPost = createAsyncThunk(
  "post/likes",
  async (reqData: LikesPostReqData, { rejectWithValue }) => {
    try {
      return await Post.likes(reqData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
