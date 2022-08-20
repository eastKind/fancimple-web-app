import authReducer from "./auth";
import userReducer from "./user";
import postReducer from "./post";
import commentReducer from "./comment";

const reducer = {
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
};

export default reducer;
