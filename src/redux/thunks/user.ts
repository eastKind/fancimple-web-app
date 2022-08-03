import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserReqData, SignupReqData, FollowReqData } from "../../types";
import User from "../../api/User";

export const signup = createAsyncThunk(
  "user/signup",
  async (reqData: SignupReqData, { rejectWithValue }) => {
    try {
      return await User.signup(reqData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMe = createAsyncThunk(
  "user/getMe",
  async (_, { rejectWithValue }) => {
    try {
      return await User.me();
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (reqData: GetUserReqData, { rejectWithValue }) => {
    try {
      return await User.get(reqData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPhoto = createAsyncThunk(
  "user/editPhoto",
  async (reqData: FormData, { rejectWithValue }) => {
    try {
      return await User.editPhoto(reqData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const follow = createAsyncThunk(
  "user/follow",
  async (reqData: FollowReqData, { rejectWithValue }) => {
    try {
      return await User.follow(reqData);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
