import authReducer from "./auth";
import userReducer from "./user";
import postReducer from "./post";
import commentReducer from "./comment";

export default {
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
};
