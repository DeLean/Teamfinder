import { combineReducers } from "redux";
import authentication from "./authentication";
import errors from "./errors";
import profiles from "./profiles";
import posts from "./posts";

export default combineReducers({
  auth: authentication,
  errors: errors,
  profile: profiles,
  post: posts
});
