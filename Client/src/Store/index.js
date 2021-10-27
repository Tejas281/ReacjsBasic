import auth from "./Auth";
import createSagaMiddleware from 'redux-saga';
import users from "./Users/index"
import count from "./CoustUser/CountUser"
import  pagination  from "./Users/Pagination";
import { configureStore } from "@reduxjs/toolkit";
import { logger } from 'redux-logger';
import allsaga from "./Saga/index";
import ProductReducer from "./Product/ProductReducer";
import CountProductReducer from "./Product Count /ProductCountReducer";
 const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware,logger];


const store = configureStore({
  reducer: {
    auth,
    users,
    count,
    pagination,
    ProductReducer,
    CountProductReducer,
  },middleware
  });
    sagaMiddleware.run(allsaga)

 export default store;
