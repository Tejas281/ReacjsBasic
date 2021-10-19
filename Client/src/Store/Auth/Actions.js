export const USER_ADD = "USER_ADD";
export const GET_AUTH_USER = "GET_AUTH_USER"

export function userAdd(user) {
  return {
    type: USER_ADD,
    user,
  };
}
export function getAuthuser()
{
  return{
    type:GET_AUTH_USER,
  }
}