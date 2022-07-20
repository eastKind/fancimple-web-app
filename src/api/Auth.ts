import axiosInstance from "./axios";
import { SigninReqData, UserData } from "../types";

export default class Auth {
  public static async signin(reqData: SigninReqData): Promise<UserData> {
    const response = await axiosInstance.post("/session", reqData);
    return response.data.user;
  }

  public static async signout(): Promise<void> {
    await axiosInstance.delete("/session");
  }
}
