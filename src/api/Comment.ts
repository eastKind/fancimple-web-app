import axiosInstance from "./axios";
import {
  GetCommentsResData,
  GetCommentsReqData,
  CreateCommentReqData,
  DeleteCommentReqData,
  CommentData,
} from "../types";

export default class Comment {
  public static async get({
    id,
    cursor,
    limit,
  }: GetCommentsReqData): Promise<GetCommentsResData> {
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

  // public static async update(reqData: CreateCommentReqData): Promise<CommentData> {
  //   const { id, contents } = reqData;
  //   const response = await axiosInstance.patch(`/comment/${id}`, { contents });
  //   return response.data.comment;
  // }

  public static async delete({
    commentId,
    postId,
  }: DeleteCommentReqData): Promise<string> {
    const query = `postId=${postId}`;
    const response = await axiosInstance.delete(
      `/comment/${commentId}?${query}`
    );
    return response.data.commentId;
  }
}
