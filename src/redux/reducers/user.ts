import { createSlice, SerializedError, AnyAction } from "@reduxjs/toolkit";
import { getUser, getMe, editPhoto, follow, bookmark } from "../thunks/user";
import { UserData, MyData } from "../../types";
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
  me: MyData;
  other: UserData;
}

const INIT_USER = {
  _id: "",
  name: "",
  email: "",
  photoUrl: photo,
  followers: [],
  followings: [],
  postCount: 0,
};
const INIT_ME = { ...INIT_USER, bookmarks: [] };

const initialState: UserState = {
  loading: false,
  error: null,
  other: INIT_USER,
  me: INIT_ME,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: () => initialState,
    initOther: (state) => {
      state.other = initialState.other;
    },
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
        state.me.photoUrl = action.payload;
      })
      .addCase(follow.fulfilled, (state, action) => {
        const { followers, followings } = action.payload;
        state.other.followers = followers;
        state.me.followings = followings;
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
        state.error = action.error;
      });
  },
});

export const { initUser, initOther } = userSlice.actions;

export default userSlice.reducer;
