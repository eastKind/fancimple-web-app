import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Auth from "../api/Auth";
import { SigninReqData } from "../types";

export const signin = createAsyncThunk(
  "auth/signin",
  async (loginData: SigninReqData) => {
    return await Auth.signin(loginData);
  }
);

export const signout = createAsyncThunk("auth/signout", async () => {
  return await Auth.signout();
});

interface AuthState {
  loading: boolean;
  sessionId: string | undefined;
  error: SerializedError | null;
}

const initialState: AuthState = {
  loading: false,
  sessionId: Cookies.get("sessionId"),
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state) => {
        state.loading = false;
        state.sessionId = Cookies.get("sessionId");
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(signout.pending, (state) => {
        state.loading = true;
      })
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        Cookies.remove("sessionId");
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        Cookies.remove("sessionId");
      });
  },
});

export default authSlice.reducer;
