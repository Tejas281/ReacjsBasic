export const COUNT_USERS = "COUNT_USERS";
export const GET_COUNT = "GET_COUNT"

export function getcount()
{
  return {
    type : GET_COUNT,
  }
}

export function countUser(UsersValues) {
  return {
    type: COUNT_USERS,
    UsersValues,
  };
}
