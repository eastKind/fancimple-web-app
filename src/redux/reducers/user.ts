import { createSlice, AnyAction } from "@reduxjs/toolkit";
import {
  getUser,
  getMe,
  editPhoto,
  editName,
  editDesc,
  follow,
  bookmark,
} from "../thunks/user";
import type { UserData, MyData, Error } from "../../types";
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
  error: Error | null;
  user: UserData;
  me: MyData;
}

const INIT_USER = {
  _id: "",
  name: "",
  desc: "",
  photoUrl: photo,
  followers: [],
  followings: [],
  postCount: 0,
};

const initialState: UserState = {
  loading: false,
  error: null,
  user: INIT_USER,
  me: { ...INIT_USER, bookmarks: [] },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    init: (state) => {
      state = initialState;
    },
    initUser: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.fulfilled, (state, action) => {
        state.me = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(editPhoto.fulfilled, (state, action) => {
        state.me.photoUrl = action.payload;
      })
      .addCase(editName.fulfilled, (state, action) => {
        state.me.name = action.payload;
      })
      .addCase(editDesc.fulfilled, (state, action) => {
        state.me.desc = action.payload;
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.me.followings = action.payload;
      })
      .addCase(bookmark.fulfilled, (state, action) => {
        state.me.bookmarks = action.payload;
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
        state.error = action.payload;
      });
  },
});

export const { init, initUser } = userSlice.actions;

export default userSlice.reducer;
