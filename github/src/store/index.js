import auth from "./auth";
import users from "./users";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "../service/api";

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    auth,
    users,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export default store;

setupListeners(store.dispatch);
