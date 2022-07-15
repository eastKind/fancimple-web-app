import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Auth from "../api/Auth";
import { LoginReqData } from "../types/api";

export const login = createAsyncThunk(
  "auth/login",
  async (loginData: LoginReqData, { rejectWithValue }) => {
    try {
      return await Auth.login(loginData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await Auth.logout();
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.sessionId = Cookies.get("sessionId");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error;
      })
      .addDefaultCase((state, action) => {
        if (/^.*\/logout\/.*$/.test(action.type)) {
          state.loading = false;
          Cookies.remove("sessionId");
        }
      });
  },
});

export default authSlice.reducer;
