import instanceWithCredentials from "./axios";
import { SignupReqData, UserData } from "../types/api";

export default class User {
  public static async signup(reqData: SignupReqData): Promise<void> {
    await instanceWithCredentials.post("/user", reqData);
  }

  public static async getMe(): Promise<UserData> {
    const response = await instanceWithCredentials.get("/user");
    return response.data;
  }
}
