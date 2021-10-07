const COUNT_USERS = "COUNT_USERS";
export function countUser(UsersValues) {
  return {
    type: COUNT_USERS,
    UsersValues,
  };
}
const defaultuserAuth = { UsersValues: null };
function usersReducer(state = defaultuserAuth, action){
  console.log({ action });
  switch (action.type) {
    case COUNT_USERS:
      return {
        ...state,
        UsersValues: action.UsersValues,
             };
    default:
      return state;
  }
}
export default usersReducer;
