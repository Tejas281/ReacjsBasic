import { all } from "@redux-saga/core/effects";
import authUserSaga from "../Auth/SagaAuth";

import userSaga from "../CoustUser/SagaCountUser";
import DataProductCount from "../Product Count /ProductCountSaga";
import DataProduct from "../Product/ProductSaga";
import AlluserS from "../Users/SagaUsers";

function* allsaga()
{
    yield all([
        userSaga(),     
        authUserSaga(),
        AlluserS(),
        DataProduct(),
        DataProductCount(),
    ])
}

export default allsaga;