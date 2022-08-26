import { createAsyncThunk } from "@reduxjs/toolkit";
import Auth from "../../api/Auth";
import type { SigninReqData } from "../../types";

export const signin = createAsyncThunk(
  "auth/signin",
  async (arg: SigninReqData, { rejectWithValue }) => {
    try {
      return await Auth.signin(arg);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const signout = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      return await Auth.signout();
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);
