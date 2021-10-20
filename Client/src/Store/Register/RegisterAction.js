export const SET_REGISTER_USER = "SET_REGISTER_USER";
export const GET_REGISTER_USER = "GET_REGISTER_USER";

export function setRegister(registerUser) {
    return { type: SET_REGISTER_USER, registerUser };
}

export function getRegister() {
    return {
        type: GET_REGISTER_USER,
    }
}
