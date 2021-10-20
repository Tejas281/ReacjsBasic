import { all, call,put,takeEvery } from "@redux-saga/core/effects";
import axios from "axios";
import { getUser, GET_USER } from "./UsersAction";

function fetchUser(){
    return axios.get(``)
    .then((res)=>{

    }).
    catch(()=>{

    })
}

function* fetchAllUsers(){
    const allUserFound = yield  call(fetchUser);
    yield put (getUser(allUserFound))
}


function* AlluserS() {
    yield takeEvery(GET_USER, fetchAllUsers);
  }

  export default AlluserS