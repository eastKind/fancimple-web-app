import axiosInstance from "./axios";
import {
  GetCommentResData,
  GetCommentsQuery,
  CreateCommentReqData,
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

  public static async create(
    reqData: CreateCommentReqData
  ): Promise<CommentData> {
    const response = await axiosInstance.post("/comment", reqData);
    return response.data.comment;
  }
}
