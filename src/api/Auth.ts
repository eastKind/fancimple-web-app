import axiosInstance from "./axios";
import { SigninReqData } from "../types/api";

export default class Auth {
  public static async signin(reqData: SigninReqData): Promise<void> {
    await axiosInstance.post("/session", reqData, { withCredentials: true });
  }

  public static async signout(): Promise<void> {
    await axiosInstance.delete("/session");
  }
}
