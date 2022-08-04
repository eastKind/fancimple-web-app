import axiosInstance from "./axios";
import {
  FollowReqData,
  FollowResData,
  GetUserReqData,
  SignupReqData,
  BookmarkReqData,
  UserData,
  MyData,
} from "../types";

export default class User {
  public static async signup(reqData: SignupReqData): Promise<void> {
    await axiosInstance.post("/user", reqData);
  }

  public static async me(): Promise<MyData> {
    const response = await axiosInstance.get("/user/me");
    return response.data.user;
  }

  public static async get({ userId }: GetUserReqData): Promise<UserData> {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data.user;
  }

  public static async editPhoto(reqData: FormData): Promise<MyData> {
    const response = await axiosInstance.patch("/user/photo", reqData);
    return response.data.user;
  }

  public static async follow(reqData: FollowReqData): Promise<FollowResData> {
    const response = await axiosInstance.patch("/user/follow", reqData);
    return response.data;
  }

  public static async bookmark(reqData: BookmarkReqData): Promise<string[]> {
    const response = await axiosInstance.patch("/user/bookmark", reqData);
    return response.data.bookmarks;
  }
}
