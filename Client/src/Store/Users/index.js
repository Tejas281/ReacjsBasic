import { GET_USER, PER_PAGE, USERS_SET } from "./UsersAction";
const defaultuserAuth = { users: null,pageInfo: null, loading: true  };

function usersReducer(state = defaultuserAuth, action) {
  console.log({ action });
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loading: true,
      };
    case USERS_SET:
      return {
        ...state,
        users: action.users,
        pageInfo: {...state.pageInfo, count: state.pageInfo.count - action.deletedCount},
        loading: false,
      };
      case PER_PAGE:
        return{
          ...state,
          users: [...(state.users || []), ...action.usersPerPage.users],
          pageInfo: action.usersPerPage.info,
          loading: false,
        }
    default:
      return state;
  }
}
export default usersReducer;
