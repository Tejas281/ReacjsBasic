import { combineReducers } from "redux";
import auth from "./auth";
import users from './users';

const reducer = combineReducers({
  auth,
  users
});

export default reducer;