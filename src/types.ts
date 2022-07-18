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
  contents: string | null;
  images: Image[] | null;
  writer: User;
  createdAt: string;
  likeCount: number;
  commentCount: number;
};

export type GetPostsResData = {
  hasNext: boolean;
  posts: PostData[];
};
