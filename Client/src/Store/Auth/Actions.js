export const USER_ADD = "USER_ADD";
export function userAdd(user) {
  return {
    type: USER_ADD,
    user,
  };
}
