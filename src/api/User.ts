import axiosInstance from "./axios";
import { SignupReqData, UserData } from "../types";

export default class User {
  public static async signup(reqData: SignupReqData): Promise<void> {
    await axiosInstance.post("/user", reqData);
  }

  public static async getMe(): Promise<UserData> {
    const response = await axiosInstance.get("/user");
    return response.data.user;
  }
}
