import { GET_USER, USERS_SET } from "./UsersAction";
const defaultuserAuth = { users: null };
function usersReducer(state = defaultuserAuth, action) {
  console.log({ action });
  switch (action.type) {
    case USERS_SET:
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
export default usersReducer;
