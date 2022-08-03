import axiosInstance from "./axios";
import {
  FollowReqData,
  GetUserReqData,
  SignupReqData,
  UserData,
} from "../types";

export default class User {
  public static async signup(reqData: SignupReqData): Promise<void> {
    await axiosInstance.post("/user", reqData);
  }

  public static async me(): Promise<UserData> {
    const response = await axiosInstance.get("/user/me");
    return response.data.user;
  }

  public static async get({ userId }: GetUserReqData): Promise<UserData> {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data.user;
  }

  public static async editPhoto(reqData: FormData): Promise<UserData> {
    const response = await axiosInstance.patch("/user/photo", reqData);
    return response.data.user;
  }

  public static async follow(reqData: FollowReqData): Promise<string[]> {
    const response = await axiosInstance.patch("/user/follow", reqData);
    return response.data.followers;
  }
}
