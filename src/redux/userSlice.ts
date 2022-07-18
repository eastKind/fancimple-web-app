import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  AnyAction,
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

function isPendingAction(action: AnyAction) {
  return /^user\/.*\/pending$/.test(action.type);
}
function isFulfilledAction(action: AnyAction) {
  return /^user\/.*\/fulfilled$/.test(action.type);
}
function isRejectedAction(action: AnyAction) {
  return /^user\/.*\/rejected$/.test(action.type);
}

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
      .addCase(getMe.fulfilled, (state, action) => {
        state.userData = action.payload;
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

export default userSlice.reducer;
