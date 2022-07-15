import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { SignupReqData, UserData } from "../types/api";
import User from "../api/User";
import { login } from "./authSlice";

export const signup = createAsyncThunk(
  "user/signup",
  async (signupData: SignupReqData, { rejectWithValue, dispatch }) => {
    try {
      await User.signup(signupData);
      const { email, password } = signupData;
      await dispatch(login({ email, password }));
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
      });
  },
});

export default userSlice.reducer;
