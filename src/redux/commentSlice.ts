import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  AnyAction,
} from "@reduxjs/toolkit";
import Comment from "../api/Comment";
import {
  CommentData,
  GetCommentsReqData,
  CreateCommentReqData,
  DeleteCommentReqData,
} from "../types";

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

function isPendingAction(action: AnyAction) {
  return /^comment\/.*\/pending$/.test(action.type);
}
function isFulfilledAction(action: AnyAction) {
  return /^comment\/.*\/fulfilled$/.test(action.type);
}
function isRejectedAction(action: AnyAction) {
  return /^comment\/.*\/rejected$/.test(action.type);
}

interface CommentState {
  loading: boolean;
  error: SerializedError | null;
  comments: CommentData[];
  cursor: string;
  hasNext: boolean;
}

const initialState: CommentState = {
  loading: false,
  error: null,
  comments: [],
  cursor: "",
  hasNext: false,
};

export const commentSlice = createSlice({
  name: "comment",
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
      .addCase(getComments.fulfilled, (state, action) => {
        const { cursor } = action.meta.arg;
        if (cursor) {
          state.comments.push(...action.payload);
        } else {
          state.comments = action.payload;
        }
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addCase(
        deleteComment.fulfilled,
        (state, { payload: deletedCommentId }) => {
          state.comments = state.comments.filter(
            (comment) => comment._id !== deletedCommentId
          );
        }
      )
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

export const { setCursor, setHasNext } = commentSlice.actions;

export default commentSlice.reducer;
