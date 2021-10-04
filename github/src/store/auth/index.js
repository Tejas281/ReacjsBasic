import { USER_ADD } from "./actions";

const defaultuserAuth = { user: null };

function authReducer(state = defaultuserAuth, action) {
  console.log({ action });
  switch (action.type) {
    case USER_ADD:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}

export default authReducer;
