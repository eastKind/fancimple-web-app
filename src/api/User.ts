import axiosInstance from "./axios";
import type {
  ValidateReqData,
  FollowReqData,
  GetUserReqData,
  GetUsersReqData,
  GetUsersResData,
  SignupReqData,
  BookmarkReqData,
  UserData,
  MyData,
} from "../types";

export default class User {
  public static async validate(reqData: ValidateReqData): Promise<string> {
    const response = await axiosInstance.post("/user/validate", reqData);
    return response.data.caution;
  }

  public static async signup(reqData: SignupReqData): Promise<void> {
    await axiosInstance.post("/user", reqData);
  }

  public static async getMe(): Promise<MyData> {
    const response = await axiosInstance.get("/user/me");
    return response.data.user;
  }

  public static async getOther({ userId }: GetUserReqData): Promise<UserData> {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data.user;
  }

  public static async getFollowers({
    userId,
    cursor,
    limit,
  }: GetUsersReqData): Promise<GetUsersResData> {
    const query = `cursor=${cursor}&limit=${limit}`;
    const response = await axiosInstance.get(
      `/user/followers/${userId}?${query}`
    );
    return response.data;
  }

  public static async getFollowings({
    userId,
    cursor,
    limit,
  }: GetUsersReqData): Promise<GetUsersResData> {
    const query = `cursor=${cursor}&limit=${limit}`;
    const response = await axiosInstance.get(
      `/user/followings/${userId}?${query}`
    );
    return response.data;
  }

  public static async editPhoto(reqData: FormData): Promise<string> {
    const response = await axiosInstance.patch("/user/photo", reqData);
    return response.data.photoUrl;
  }

  public static async follow(reqData: FollowReqData): Promise<void> {
    await axiosInstance.patch("/user/follow", reqData);
  }

  public static async bookmark(reqData: BookmarkReqData): Promise<void> {
    await axiosInstance.patch("/user/bookmark", reqData);
  }
}
