import axiosInstance from "./axios";
import type {
  User as UserType,
  ValidateReqData,
  FollowReqData,
  FollowResData,
  GetUserReqData,
  GetUsersReqData,
  GetFollowReqData,
  GetUsersResData,
  SignupReqData,
  BookmarkReqData,
  EditPWReqData,
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

  public static async getUser({ userId }: GetUserReqData): Promise<UserData> {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data.user;
  }

  public static async getUsers({
    keyword,
    cursor,
    limit,
  }: GetUsersReqData): Promise<GetUsersResData> {
    const query = `keyword=${keyword}&cursor=${cursor}&limit=${limit}`;
    const response = await axiosInstance.get(`/user?${query}`);
    return response.data;
  }

  public static async getFollow({
    userId,
    type,
    cursor,
    limit,
  }: GetFollowReqData): Promise<GetUsersResData> {
    const query = `cursor=${cursor}&limit=${limit}`;
    const response = await axiosInstance.get(
      `/user/${type}/${userId}?${query}`
    );
    return response.data;
  }

  public static async editPhoto(reqData: FormData): Promise<string> {
    const response = await axiosInstance.patch("/user/photo", reqData);
    return response.data.photoUrl;
  }

  public static async editName(reqData: string): Promise<string> {
    const response = await axiosInstance.patch("/user/name", { name: reqData });
    return response.data.name;
  }

  public static async editDesc(reqData: string): Promise<string> {
    const response = await axiosInstance.patch("/user/desc", { desc: reqData });
    return response.data.desc;
  }

  public static async editPassword(reqData: EditPWReqData): Promise<void> {
    await axiosInstance.patch("/user/password", reqData);
  }

  public static async follow(reqData: FollowReqData): Promise<FollowResData> {
    const response = await axiosInstance.patch("/user/follow", reqData);
    return response.data;
  }

  public static async bookmark(reqData: BookmarkReqData): Promise<string[]> {
    const response = await axiosInstance.patch("/user/bookmark", reqData);
    return response.data.bookmarks;
  }

  public static async getHistories(): Promise<UserType[]> {
    const response = await axiosInstance.get("/user/history/search");
    return response.data.histories;
  }

  public static async postHistories(reqData: string): Promise<void> {
    await axiosInstance.post("/user/history/search", {
      userId: reqData,
    });
  }

  public static async clearHistories(): Promise<void> {
    await axiosInstance.delete("/user/history/search");
  }
}
