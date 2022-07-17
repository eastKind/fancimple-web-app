import axiosInstance from "./axios";
import { PostData } from "../types";

export default class Post {
  public static async create(reqData: FormData): Promise<PostData> {
    const response = await axiosInstance.post("/post", reqData);
    return response.data.post;
  }
}
