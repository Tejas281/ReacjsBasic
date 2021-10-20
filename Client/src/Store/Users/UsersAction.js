export const USERS_SET = "USERS_SET";
export const GET_USER = "GET_USER";
export const PER_PAGE = "PER_PAGE"

export function setUsers(users,deletedCount) {
  return {
    type: USERS_SET,
    users,
    deletedCount
  };
}

export function getUser(data){
    return{
        type: GET_USER,
        data
    }
}

export function addUsers(usersPerPage){    
        return{
          type:PER_PAGE,
          usersPerPage,
        }
}