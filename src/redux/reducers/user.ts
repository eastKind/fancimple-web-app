import { createSlice, SerializedError, AnyAction } from "@reduxjs/toolkit";
import { getUser, getMe, editPhoto, follow } from "../thunks/user";
import { UserData } from "../../types";
import photo from "../../essets/images/person.png";

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
  me: UserData;
  other: UserData;
}

const INIT_USER = {
  _id: "",
  name: "",
  email: "",
  photoUrl: photo,
  followers: [],
  followings: [],
  likedPosts: [],
  postCount: 0,
};

const initialState: UserState = {
  loading: false,
  error: null,
  me: INIT_USER,
  other: INIT_USER,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.fulfilled, (state, action) => {
        state.me = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.other = action.payload;
      })
      .addCase(editPhoto.fulfilled, (state, action) => {
        state.me = action.payload;
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.other.followers = action.payload;
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

export const { initUser } = userSlice.actions;

export default userSlice.reducer;
