import { GET_AUTH_USER, USER_ADD } from "./Actions";
const defaultuserAuth = { user: null };


function authReducer(state = defaultuserAuth, action) {
  console.log({ action });
  switch (action.type) {
    case USER_ADD:
      return {
        ...state,
        user: action.user,
        loading: false
      };
      case GET_AUTH_USER :
        return{
          ...state,
          loading : true
        }
    default:
      return state;
  }
}
export default authReducer;
