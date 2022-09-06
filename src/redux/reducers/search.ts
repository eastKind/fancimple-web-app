import type { User, Error } from "../../types";
import { createSlice, AnyAction } from "@reduxjs/toolkit";
import {
  getResult,
  getHistories,
  clearHistories,
  postHistories,
} from "../thunks/search";
import getNextCursor from "../../utils/getNextCursor";

function isPendingAction(action: AnyAction) {
  return /^search\/.*\/pending$/.test(action.type);
}
function isFulfilledAction(action: AnyAction) {
  return /^search\/.*\/fulfilled$/.test(action.type);
}
function isRejectedAction(action: AnyAction) {
  return /^search\/.*\/rejected$/.test(action.type);
}

interface SearchState {
  loading: boolean;
  error: Error | null;
  result: User[];
  histories: User[];
  cursor: string;
  hasNext: boolean;
}

const initialState: SearchState = {
  loading: false,
  error: null,
  result: [],
  histories: [],
  cursor: "",
  hasNext: false,
};

export const postSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clear: (state) => {
      state.cursor = "";
      state.hasNext = false;
      state.result = [];
    },
    initSearch: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResult.fulfilled, (state, action) => {
        const { users, hasNext } = action.payload;
        const { cursor } = action.meta.arg;
        if (cursor) {
          state.result.push(...users);
        } else {
          state.result = users;
        }
        state.hasNext = hasNext;
        state.cursor = getNextCursor(users);
      })
      .addCase(getHistories.fulfilled, (state, action) => {
        state.histories = action.payload;
      })
      .addCase(postHistories.fulfilled, (state, action) => {
        state.histories = action.payload;
      })
      .addCase(clearHistories.fulfilled, (state) => {
        state.histories = [];
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

export const { clear, initSearch } = postSlice.actions;

export default postSlice.reducer;
