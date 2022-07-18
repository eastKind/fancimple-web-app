import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  AnyAction,
} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Auth from "../api/Auth";
import { SigninReqData } from "../types";

export const signin = createAsyncThunk(
  "auth/signin",
  async (arg: SigninReqData) => {
    return await Auth.signin(arg);
  }
);

export const signout = createAsyncThunk("auth/signout", async () => {
  return await Auth.signout();
});

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
  sessionId: string | undefined;
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
      .addCase(signout.fulfilled, () => {
        Cookies.remove("sessionId");
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
        Cookies.remove("sessionId");
      });
  },
});

export default authSlice.reducer;
