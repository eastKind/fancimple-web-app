import axiosInstance from "./axios";
import { GetUserReqData, SignupReqData, UserData } from "../types";

export default class User {
  public static async signup(reqData: SignupReqData): Promise<void> {
    await axiosInstance.post("/user", reqData);
  }

  public static async me(): Promise<UserData> {
    const response = await axiosInstance.get("/user/me");
    return response.data.user;
  }

  public static async get({ id }: GetUserReqData): Promise<UserData> {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data.user;
  }

  public static async editPhoto(reqData: FormData): Promise<UserData> {
    const response = await axiosInstance.patch("/user/photo", reqData);
    return response.data.user;
  }
}
