import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SnackbarProvider, useSnackbar } from 'notistack';


ReactDOM.render(
  <React.StrictMode>
  <SnackbarProvider maxSnack={3}>
    <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
