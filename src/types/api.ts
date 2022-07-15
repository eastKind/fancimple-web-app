export type LoginReqData = {
  email: string;
  password: string;
};

export type SignupReqData = {
  name: string;
  email: string;
  password: string;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  followers: string[];
  followings: string[];
  photoUrl: string;
};
