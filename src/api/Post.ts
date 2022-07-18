import axiosInstance from "./axios";
import { GetPostsResData, PostData, GetPostsQuery } from "../types";

export default class Post {
  public static async create(reqData: FormData): Promise<PostData> {
    const response = await axiosInstance.post("/post", reqData);
    return response.data.post;
  }

  public static async get({
    cursor,
    limit = 10,
  }: GetPostsQuery): Promise<GetPostsResData> {
    const query = `cursor=${cursor}&limit=${limit}`;
    const response = await axiosInstance.get(`/post?${query}`);
    return response.data;
  }

  public static async delete(id: string): Promise<string> {
    const response = await axiosInstance.delete(`/post/${id}`);
    return response.data.id;
  }
}
