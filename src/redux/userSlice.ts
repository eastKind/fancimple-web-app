import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { SignupReqData, UserData } from "../types/api";
import User from "../api/User";

export const signup = createAsyncThunk(
  "user/signup",
  async (signupData: SignupReqData) => {
    return await User.signup(signupData);
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
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default userSlice.reducer;
