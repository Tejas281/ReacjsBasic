const USERS_SET = "USERS_SET";
export function setUsers(users) {
  return {
    type: USERS_SET,
    users,
  };
}
const defaultuserAuth = { users: null };
function usersReducer(state = defaultuserAuth, action) {
  console.log({ action });
  switch (action.type) {
    case USERS_SET:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
}
export default usersReducer;
