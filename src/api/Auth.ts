import axiosInstance from "./axios";
import type { SigninReqData } from "../types";

export default class Auth {
  public static async signin(reqData: SigninReqData): Promise<void> {
    await axiosInstance.post("/session", reqData);
  }

  public static async signout(): Promise<void> {
    await axiosInstance.delete("/session");
  }
}
