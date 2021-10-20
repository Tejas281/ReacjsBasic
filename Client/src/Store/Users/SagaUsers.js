import { call, all, put, takeEvery } from "redux-saga/effects";
import api from "../../Utils/api";
import { addUsers, GET_USER } from "./UsersAction";


function fetchprofile({page, rowsPerPage}) {
  return api
    .get(`/users/pages?page=${page}&limit=${rowsPerPage}`)
    .then(res=>res.data)
    .catch((error) => {
      throw error;
    });
}

function* fetchUsers({data}) {
  const res = yield call(fetchprofile, data);
  yield put(addUsers({users: res.users, info: res.info}));
}

function* allusers() {
  yield takeEvery(GET_USER, fetchUsers);
}

export default allusers;