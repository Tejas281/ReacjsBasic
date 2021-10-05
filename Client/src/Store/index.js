import auth from "./Auth";
import users from "./Users";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    auth,
    users,
  },
  middleware: (getMiddleware) => getMiddleware(),
});

export default store;

setupListeners(store.dispatch);
