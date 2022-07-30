import { createAsyncThunk } from "@reduxjs/toolkit";
import Auth from "../../api/Auth";
import User from "../../api/User";
import { SigninReqData } from "../../types";

export const signin = createAsyncThunk(
  "auth/signin",
  async (arg: SigninReqData, { rejectWithValue }) => {
    try {
      return await Auth.signin(arg);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMe = createAsyncThunk("auth/getMe", async () => {
  return await User.getMe();
});

export const signout = createAsyncThunk("auth/signout", async () => {
  return await Auth.signout();
});
