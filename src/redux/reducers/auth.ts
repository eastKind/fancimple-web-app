import { createSlice, SerializedError, AnyAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { signin, signout, getMe } from "../thunks/auth";
import { UserData } from "../../types";

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
  error: SerializedError | null;
  sessionId?: string;
  userData: UserData;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  sessionId: Cookies.get("sessionId"),
  userData: {
    _id: "",
    name: "",
    email: "",
    photoUrl: "",
    followers: [],
    followings: [],
    likedPosts: [],
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        state.sessionId = Cookies.get("sessionId");
        state.userData = action.payload;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(signout.fulfilled, (state) => {
        state.sessionId = undefined;
        state.userData = initialState.userData;
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

export default authSlice.reducer;
