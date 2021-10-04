import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Provider } from "react-redux";
import { createStore } from "redux";
import userAuthApp from "./store";
const store = createStore(userAuthApp);

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
