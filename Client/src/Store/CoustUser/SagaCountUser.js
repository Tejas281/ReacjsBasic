// import { call, put, takeEvery } from "redux-saga/effects";

// const apiUrl = `http://localhost:5000/api/users/usersdata`;

// function fetchcount() {
//   return fetch(apiUrl, {
//     method: "GET",
//   })
//     .then((response) => response.json())
//     .catch((error) => {
//       throw error;
//     });
// }
// function* Usercount(action) {
//   const usercount = yield call(fetchcount);
//   yield put(countUser(usercount));
// }

// function* userSaga() {
//   yield takeEvery(GET_COUNT, Usercount);
// }

import { countUser, GET_COUNT } from "./CounstUserAction";
import { call, all, put, takeEvery } from "redux-saga/effects";

const apiUrl = `http://localhost:5000/api/users/usersdata`;

function fetchcount() {
  return fetch(apiUrl, {
    method: "GET",
  })
  .then((response) => response.json())
  .catch((error) => {
    throw error;
  });
}
function* fetchUsers(action) {
  const count = yield call(fetchcount);
  yield put(countUser(count));
}
function* userSaga() {
  yield takeEvery(GET_COUNT, fetchUsers);
}

export default userSaga;