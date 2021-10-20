export const USERS_SET = "USERS_SET";
export const GET_USER = "GET_USER";


export function setUsers(users) {
  return {
    type: USERS_SET,
    users,
  };
}

export function getUser(){
    return{
        type: GET_USER,
    }
}