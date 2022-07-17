export type SigninReqData = {
  email: string;
  password: string;
};

export type SignupReqData = {
  name: string;
  email: string;
  password: string;
};

export interface Post {
  id: string;
  thumbnail: string;
  likeCount: number;
  commentCount: number;
}

export interface User {
  id: string;
  name: string;
  photoUrl: string;
}

export interface Image {
  id: string;
  url: string;
  key: string;
}

export type UserData = {
  id: string;
  name: string;
  email: string;
  followers: User[];
  followings: User[];
  photoUrl: string;
  posts: Post[];
};

export type PostData = {
  id: string;
  title: string;
  contents: string | null;
  images: Image[] | null;
  writer: User;
  createdAt: string;
  likeCount: number;
  commentCount: number;
};
