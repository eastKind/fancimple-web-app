import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import Post from "../api/Post";
import { PostData } from "../types";

export const create = createAsyncThunk("post/create", async (arg: FormData) => {
  return await Post.create(arg);
});

interface PostState {
  loading: boolean;
  error: SerializedError | null;
  posts: PostData[];
}

const initialState: PostState = {
  loading: false,
  error: null,
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addDefaultCase((state, action) => {
        if (action.type.endsWith("/pending")) {
          state.loading = true;
        }
        if (action.type.endsWith("/rejected")) {
          state.loading = false;
          state.error = action.error;
        }
      });
  },
});

export default postSlice.reducer;
