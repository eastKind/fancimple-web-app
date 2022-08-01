import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCursor, setHasNext } from "../reducers/post";
import Post from "../../api/Post";
import {
  GetPostsReqData,
  UpdatePostReqData,
  DeletePostReqData,
  LikesPostReqData,
} from "../../types";

export const getPosts = createAsyncThunk(
  "post/get",
  async ({ userId, cursor, limit }: GetPostsReqData, { dispatch }) => {
    const { posts, hasNext } = await Post.get({ userId, cursor, limit });
    const nextCursor = posts.length > 0 ? posts[posts.length - 1]._id : "";
    dispatch(setCursor(nextCursor));
    dispatch(setHasNext(hasNext));
    return posts;
  }
);

export const createPost = createAsyncThunk(
  "post/create",
  async (arg: FormData) => {
    return await Post.create(arg);
  }
);

export const updatePost = createAsyncThunk(
  "post/update",
  async (arg: UpdatePostReqData) => {
    return await Post.update(arg);
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (arg: DeletePostReqData) => {
    return await Post.delete(arg);
  }
);

export const likesPost = createAsyncThunk(
  "post/likes",
  async (arg: LikesPostReqData) => {
    return await Post.likes(arg);
  }
);
