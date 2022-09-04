// API Types
//// Auth
export type SigninReqData = {
  email: string;
  password: string;
};

/// User
export type ValidateReqData = {
  [key: string]: string;
};

export type SignupReqData = {
  name: string;
  email: string;
  password: string;
};

export type GetUserReqData = {
  userId: string;
};

export type GetUsersReqData = {
  keyword: string;
  cursor: string;
  limit: number;
};

export type GetFollowReqData = {
  userId: string;
  cursor: string;
  type: string;
  limit: number;
};

export type GetUsersResData = {
  users: User[];
  hasNext: boolean;
};

export type FollowReqData = {
  userId: string;
  isFollowed: boolean;
};

export type BookmarkReqData = {
  postId: string;
  isMarked: boolean;
};

export type EditPWReqData = {
  current: string;
  next: string;
};

//// Post
export type GetPostsReqData = {
  cursor: string;
  limit: number;
  userId?: string;
  bookmark?: boolean;
};

export type UpdatePostReqData = {
  postId: string;
  texts: string;
  deletedKeys: string[];
};

export type DeletePostReqData = {
  postId: string;
};

export type GetPostsResData = {
  hasNext: boolean;
  posts: PostData[];
};

export type LikesPostReqData = {
  postId: string;
  isLiked: boolean;
};

//// Comment
export type GetCommentsReqData = {
  postId: string;
  cursor: string;
  limit: number;
};

export type CreateCommentReqData = {
  postId: string;
  contents: string;
};

export type DeleteCommentReqData = {
  postId: string;
  commentId: string;
};

export type LikesCommentReqData = {
  commentId: string;
  isLiked: boolean;
};

export type GetCommentsResData = {
  hasNext: boolean;
  comments: CommentData[];
};

// Redux Data Types
export interface Error {
  status: number;
  data: string;
}

export interface User {
  _id: string;
  name: string;
  photoUrl: string;
  desc: string;
}

export interface Image {
  _id: string;
  url: string;
  key: string;
}

export type CommentData = {
  _id: string;
  postId: string;
  contents: string;
  writer: User;
  likeUsers: string[];
  createdAt: string;
  updatedAt: string;
};

export type UserData = {
  _id: string;
  name: string;
  desc: string;
  photoUrl: string;
  followers: string[];
  followings: string[];
  postCount: number;
};

export interface MyData extends UserData {
  bookmarks: string[];
}

export type PostData = {
  _id: string;
  texts: string;
  images: Image[];
  ratio: string;
  writer: User;
  createdAt: string;
  updatedAt: string;
  likeUsers: string[];
  commentCount: number;
};

// Other Types
export interface MyParams {
  id: string;
}

export interface ValidateFn {
  (arg1: string, arg2: string): { [key: string]: string };
}
