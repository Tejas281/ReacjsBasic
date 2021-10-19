import { COUNT_USERS, GET_COUNT } from "./CounstUserAction";

export const defaultuserAuth = { UsersValues: null };


function usersReducer(state = defaultuserAuth, action){
  console.log({ action });
  switch (action.type) {
    case GET_COUNT:
      return {
        ...state,
        loading : true
      }
    case COUNT_USERS:
      return {
        ...state,
        UsersValues: action.UsersValues,
        loading : false
             };
    default:
      return state;
  }
}
export default usersReducer;
