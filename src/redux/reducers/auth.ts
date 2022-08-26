import { createSlice, AnyAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { signin, signout } from "../thunks/auth";
import type { Error } from "../../types";

function isPendingAction(action: AnyAction) {
  return /^auth\/.*\/pending$/.test(action.type);
}
function isFulfilledAction(action: AnyAction) {
  return /^auth\/.*\/fulfilled$/.test(action.type);
}
function isRejectedAction(action: AnyAction) {
  return /^auth\/.*\/rejected$/.test(action.type);
}

interface AuthState {
  loading: boolean;
  error: Error | null;
  sessionId?: string;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  sessionId: Cookies.get("sessionId"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state) => {
        state.sessionId = Cookies.get("sessionId");
      })
      .addCase(signout.fulfilled, (state) => {
        state.sessionId = undefined;
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

export default authSlice.reducer;
