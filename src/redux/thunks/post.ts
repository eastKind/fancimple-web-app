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
  async (reqData: GetPostsReqData) => {
    const data = await Post.get(reqData);
    return data;
  }
);

export const createPost = createAsyncThunk(
  "post/create",
  async (reqData: FormData) => {
    return await Post.create(reqData);
  }
);

export const updatePost = createAsyncThunk(
  "post/update",
  async (reqData: UpdatePostReqData) => {
    return await Post.update(reqData);
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (reqData: DeletePostReqData) => {
    return await Post.delete(reqData);
  }
);

export const likesPost = createAsyncThunk(
  "post/likes",
  async (reqData: LikesPostReqData) => {
    return await Post.likes(reqData);
  }
);
