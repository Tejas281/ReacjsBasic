import React from "react";

import createSagaMiddleware from 'redux-saga';
import ReactDOM from "react-dom";
import { render } from 'react-dom';
import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./Store";
import { SagaMiddleware } from "@redux-saga/core";
import {logger} from 'redux-logger'
import rootSaga from "./Store/CoustUser/SagaCountUser";
import App from './App'


ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
  
  <Provider store={store}>
  <App />
  </Provider>,
  </SnackbarProvider>,
  
document.getElementById('root')
);
