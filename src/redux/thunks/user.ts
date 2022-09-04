import { createAsyncThunk } from "@reduxjs/toolkit";
import User from "../../api/User";
import type {
  GetUserReqData,
  SignupReqData,
  FollowReqData,
  BookmarkReqData,
  EditPWReqData,
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
      return await User.getUser(reqData);
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

export const editName = createAsyncThunk(
  "user/editName",
  async (reqData: string, { rejectWithValue }) => {
    try {
      return await User.editName(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const editDesc = createAsyncThunk(
  "user/editDesc",
  async (reqData: string, { rejectWithValue }) => {
    try {
      return await User.editDesc(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const editPassword = createAsyncThunk(
  "user/editPassword",
  async (reqData: EditPWReqData, { rejectWithValue }) => {
    try {
      return await User.editPassword(reqData);
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
