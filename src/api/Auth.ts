import axios from "axios";
import { LoginReqData } from "../types/api";

const BASE_URL = "http://localhost:5000/api/session";

export default class Auth {
  public static async login(reqData: LoginReqData): Promise<void> {
    await axios.post(BASE_URL, reqData, { withCredentials: true });
  }

  public static async logout(): Promise<void> {
    await axios.delete(BASE_URL);
  }
}
