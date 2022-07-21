export type SigninReqData = {
  email: string;
  password: string;
};

export type SignupReqData = {
  name: string;
  email: string;
  password: string;
};

export type GetPostsQuery = {
  cursor: string;
  limit: number;
};

export type UpdatePostReqData = {
  _id: string;
  title: string;
  contents: string;
  deletedKeys: string[];
};

export type GetCommentsQuery = {
  id: string;
  cursor: string;
  limit: number;
};

export type CommentReqData = {
  id: string;
  contents: string;
};

export interface Post {
  _id: string;
  thumbnail: string;
  likeCount: number;
  commentCount: number;
}

export interface User {
  _id: string;
  name: string;
  photoUrl: string;
}

export interface Image {
  _id: string;
  url: string;
  key: string;
}

export type CommentData = {
  _id: string;
  contents: string;
  writer: User;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
};

export type UserData = {
  _id: string;
  name: string;
  email: string;
  followers: User[];
  followings: User[];
  photoUrl: string;
  posts: Post[];
};

export type PostData = {
  _id: string;
  title: string;
  contents: string;
  images: Image[];
  writer: User;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
};

export type GetCommentResData = {
  hasNext: boolean;
  comments: CommentData[];
};

export type GetPostsResData = {
  hasNext: boolean;
  posts: PostData[];
};

export type MyParams = {
  id: string;
};

export interface ValidateFn {
  (arg1: string, arg2: string): { [key: string]: string };
}
