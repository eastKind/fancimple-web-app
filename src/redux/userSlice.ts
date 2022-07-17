import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { SignupReqData, UserData } from "../types";
import User from "../api/User";

export const signup = createAsyncThunk(
  "user/signup",
  async (arg: SignupReqData) => {
    return await User.signup(arg);
  }
);

export const getMe = createAsyncThunk("user/getMe", async () => {
  return await User.getMe();
});

interface UserState {
  loading: boolean;
  error: SerializedError | null;
  userData: UserData | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
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

export default userSlice.reducer;
