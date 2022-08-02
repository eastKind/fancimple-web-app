import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserReqData, SignupReqData } from "../../types";
import User from "../../api/User";

export const signup = createAsyncThunk(
  "user/signup",
  async (reqData: SignupReqData) => {
    return await User.signup(reqData);
  }
);

export const getMe = createAsyncThunk("user/getMe", async () => {
  return await User.me();
});

export const getUser = createAsyncThunk(
  "user/getUser",
  async (reqData: GetUserReqData) => {
    return await User.get(reqData);
  }
);

export const editPhoto = createAsyncThunk(
  "user/editPhoto",
  async (reqData: FormData) => {
    return await User.editPhoto(reqData);
  }
);
