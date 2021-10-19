import { all } from "@redux-saga/core/effects";
import authUserSaga from "../Auth/SagaAuth";

import userSaga from "../CoustUser/SagaCountUser";

function* allsaga()
{
    yield all([
        userSaga(),     
        authUserSaga(),
    ])
}

export default allsaga;