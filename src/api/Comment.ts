import axiosInstance from "./axios";
import {
  GetCommentResData,
  GetCommentsQuery,
  CommentReqData,
  CommentData,
} from "../types";

export default class Comment {
  public static async get({
    id,
    cursor,
    limit,
  }: GetCommentsQuery): Promise<GetCommentResData> {
    const query = `id=${id}&cursor=${cursor}&limit=${limit}`;
    const response = await axiosInstance.get(`/comment?${query}`);
    return response.data;
  }

  public static async create(reqData: CommentReqData): Promise<CommentData> {
    const response = await axiosInstance.post("/comment", reqData);
    return response.data.comment;
  }

  public static async update(reqData: CommentReqData): Promise<CommentData> {
    const { id, contents } = reqData;
    const response = await axiosInstance.patch(`/comment/${id}`, { contents });
    return response.data.comment;
  }

  public static async delete(id: string): Promise<string> {
    const response = await axiosInstance.delete(`/comment/${id}`);
    return response.data.id;
  }
}
