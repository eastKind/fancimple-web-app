import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  AnyAction,
} from "@reduxjs/toolkit";
import Post from "../api/Post";
import { PostData, GetPostsQuery, UpdatePostReqData } from "../types";

export const getPosts = createAsyncThunk(
  "post/get",
  async ({ cursor, limit }: GetPostsQuery, { dispatch }) => {
    const { posts, hasNext } = await Post.get({ cursor, limit });
    const nextCursor = posts[posts.length - 1]._id;
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
  async (id: string) => {
    return await Post.delete(id);
  }
);

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
  error: SerializedError | null;
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
    setCursor: (state, action) => {
      state.cursor = action.payload;
    },
    setHasNext: (state, action) => {
      state.hasNext = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        const { cursor } = action.meta.arg;
        if (cursor) {
          state.posts.push(...action.payload);
        } else {
          state.posts = action.payload;
        }
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
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
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
        state.error = action.error;
      });
  },
});

export const { setCursor, setHasNext } = postSlice.actions;

export default postSlice.reducer;
