import axios from "axios";
import { LoginReqData } from "../types/api";

export default class Auth {
  public static async login(reqData: LoginReqData): Promise<void> {
    await axios.post("", reqData);
  }

  public static async logout(): Promise<void> {
    await axios.delete("");
  }
}
