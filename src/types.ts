// API Types
//// Auth
export type SigninReqData = {
  email: string;
  password: string;
};

/// User
export type SignupReqData = {
  name: string;
  email: string;
  password: string;
};

export type GetUserReqData = {
  userId: string;
};

export type FollowReqData = {
  userId: string;
  isFollowed: boolean;
};

//// Post
export type GetPostsReqData = {
  userId: string;
  cursor: string;
  limit: number;
};

export type UpdatePostReqData = {
  _id: string;
  title: string;
  contents: string;
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

export type GetCommentsResData = {
  hasNext: boolean;
  comments: CommentData[];
};

// Redux Data Types
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
  postId: string;
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
  photoUrl: string;
  followers: string[];
  followings: string[];
  likedPosts: string[];
  postCount: number;
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

// Other Types
export interface MyParams {
  id: string;
}

export interface ValidateFn {
  (arg1: string, arg2: string): { [key: string]: string };
}
