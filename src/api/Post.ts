import axiosInstance from "./axios";
import {
  PostData,
  GetPostsResData,
  GetPostsReqData,
  UpdatePostReqData,
  DeletePostReqData,
  LikesPostReqData,
} from "../types";

export default class Post {
  public static async get({
    userId,
    cursor,
    limit,
  }: GetPostsReqData): Promise<GetPostsResData> {
    const query = `writer=${userId}&cursor=${cursor}&limit=${limit}`;
    const response = await axiosInstance.get(`/post?${query}`);
    return response.data;
  }

  public static async create(reqData: FormData): Promise<PostData> {
    const response = await axiosInstance.post("/post", reqData);
    return response.data.post;
  }

  public static async update({
    _id,
    title,
    contents,
    deletedKeys,
  }: UpdatePostReqData): Promise<PostData> {
    const response = await axiosInstance.patch(`/post${_id}`, {
      title,
      contents,
      deletedKeys,
    });
    return response.data.post;
  }

  public static async delete({ postId }: DeletePostReqData): Promise<string> {
    const response = await axiosInstance.delete(`/post/${postId}`);
    return response.data.id;
  }

  public static async likes({
    postId,
    isLiked,
  }: LikesPostReqData): Promise<number> {
    const response = await axiosInstance.patch(`/post/${postId}/like`, {
      isLiked,
    });
    return response.data.likeCount;
  }
}
