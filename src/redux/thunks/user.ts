import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupReqData } from "../../types";
import User from "../../api/User";

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
