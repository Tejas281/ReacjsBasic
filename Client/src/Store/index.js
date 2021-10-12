import auth from "./Auth";
import users from "./Users";
import count from "./Users/CountUser"
import  pagination  from "./Users/Pagination";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    auth,
    users,
    count,
    pagination,
  },
  middleware: (getMiddleware) => getMiddleware(),
});

export default store;

setupListeners(store.dispatch);
