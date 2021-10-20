import api from "../../Utils/api";
import { GET_AUTH_USER, userAdd } from "./Actions";
import { call, put, takeEvery } from "redux-saga/effects";


function fetchAuthUser(){
return api.get(`/auth`)
.then(response=>response.data)
.catch((error)=>{
    console.log("object",error)
})
}

function* AuthUsers(action){
    const Userprofile = yield call(fetchAuthUser)
    yield put(userAdd(Userprofile))
}


function* AuthSaga() {
    yield takeEvery(GET_AUTH_USER, AuthUsers);
  }
  

export default AuthSaga;