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
  async (reqData: SignupReqData) => {
    return await User.signup(reqData);
  }
);

export const getUser = createAsyncThunk("user/getUser", async (id: string) => {
  return await User.getUser(id);
});

export const editPhoto = createAsyncThunk(
  "user/editPhoto",
  async (reqData: FormData) => {
    return await User.editPhoto(reqData);
  }
);

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
  userData: UserData;
}

const initialState: UserState = {
  loading: false,
  error: null,
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(editPhoto.fulfilled, (state, action) => {
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
