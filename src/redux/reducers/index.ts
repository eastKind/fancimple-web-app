import authReducer from "./auth";
import userReducer from "./user";
import postReducer from "./post";
import commentReducer from "./comment";
import searchReducer from "./search";

const reducer = {
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  search: searchReducer,
};

export default reducer;
