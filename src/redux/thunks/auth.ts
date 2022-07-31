import { createAsyncThunk } from "@reduxjs/toolkit";
import Auth from "../../api/Auth";
import { SigninReqData } from "../../types";
import { initUser } from "../reducers/user";

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

export const signout = createAsyncThunk(
  "auth/signout",
  async (_, { dispatch }) => {
    await Auth.signout();
    return dispatch(initUser());
  }
);
