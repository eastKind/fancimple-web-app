import type { PostData, Error } from "../../types";
import { createSlice, AnyAction } from "@reduxjs/toolkit";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  likesPost,
} from "../thunks/post";
import getNextCursor from "../../utils/getNextCursor";

function isPendingAction(action: AnyAction) {
  return /^post\/.*\/pending$/.test(action.type);
}
function isFulfilledAction(action: AnyAction) {
  return /^post\/.*\/fulfilled$/.test(action.type);
}
function isRejectedAction(action: AnyAction) {
  return /^post\/.*\/rejected$/.test(action.type);
}

interface PostState {
  loading: boolean;
  error: Error | null;
  posts: PostData[];
  cursor: string;
  hasNext: boolean;
}

const initialState: PostState = {
  loading: false,
  error: null,
  posts: [],
  cursor: "",
  hasNext: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    initPost: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        const { posts, hasNext } = action.payload;
        const { cursor } = action.meta.arg;
        if (cursor) {
          state.posts.push(...posts);
        } else {
          state.posts = posts;
        }
        state.hasNext = hasNext;
        state.cursor = getNextCursor(posts);
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, { payload: updatedPost }) => {
        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id
        );
        state.posts.splice(index, 1, updatedPost);
      })
      .addCase(deletePost.fulfilled, (state, { payload: deletedPostId }) => {
        state.posts = state.posts.filter((post) => post._id !== deletedPostId);
      })
      .addCase(likesPost.fulfilled, ({ posts }, action) => {
        const { postId } = action.meta.arg;
        const index = posts.findIndex((post) => post._id === postId);
        posts[index].likeUsers = action.payload;
      })
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.loading = false;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { initPost } = postSlice.actions;

export default postSlice.reducer;
