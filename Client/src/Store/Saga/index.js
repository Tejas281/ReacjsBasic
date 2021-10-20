import { all } from "@redux-saga/core/effects";
import authUserSaga from "../Auth/SagaAuth";

import userSaga from "../CoustUser/SagaCountUser";
import AlluserS from "../Users/SagaUsers";

function* allsaga()
{
    yield all([
        userSaga(),     
        authUserSaga(),
        AlluserS()
    ])
}

export default allsaga;