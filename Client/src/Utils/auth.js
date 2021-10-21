const TOKEN_KEY = 'token';
export const login = (token) => {
    return Promise.resolve().then(() => {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    })
}
export const logout = () => {
    return Promise.resolve().then(() => {
        localStorage.removeItem(TOKEN_KEY);
    });
}
export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}
export const getAuth = () => {
    let auth = JSON.parse(localStorage.getItem(TOKEN_KEY));
    return auth ? auth : null;
}