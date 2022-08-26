import { createAsyncThunk } from "@reduxjs/toolkit";
import User from "../../api/User";
import type {
  GetUserReqData,
  SignupReqData,
  FollowReqData,
  BookmarkReqData,
} from "../../types";

export const signup = createAsyncThunk(
  "user/signup",
  async (reqData: SignupReqData, { rejectWithValue }) => {
    try {
      return await User.signup(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const getMe = createAsyncThunk(
  "user/getMe",
  async (_, { rejectWithValue }) => {
    try {
      return await User.getMe();
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (reqData: GetUserReqData, { rejectWithValue }) => {
    try {
      return await User.getOther(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const editPhoto = createAsyncThunk(
  "user/editPhoto",
  async (reqData: FormData, { rejectWithValue }) => {
    try {
      return await User.editPhoto(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const follow = createAsyncThunk(
  "user/follow",
  async (reqData: FollowReqData, { rejectWithValue }) => {
    try {
      return await User.follow(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const bookmark = createAsyncThunk(
  "user/bookmark",
  async (reqData: BookmarkReqData, { rejectWithValue }) => {
    try {
      return await User.bookmark(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);
