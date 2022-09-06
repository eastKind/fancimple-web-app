import type { GetUsersReqData } from "../../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import User from "../../api/User";

export const getResult = createAsyncThunk(
  "search/getResult",
  async (reqData: GetUsersReqData, { rejectWithValue }) => {
    try {
      return await User.getUsers(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const getHistories = createAsyncThunk(
  "search/getHistories",
  async (_, { rejectWithValue }) => {
    try {
      return await User.getHistories();
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const postHistories = createAsyncThunk(
  "search/postHistories",
  async (reqData: string, { rejectWithValue }) => {
    try {
      return await User.postHistories(reqData);
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const clearHistories = createAsyncThunk(
  "search/clearHistories",
  async (_, { rejectWithValue }) => {
    try {
      return await User.clearHistories();
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);
