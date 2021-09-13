import React, { useState } from 'react';
import RegisterPage from './Component/RegisterPage';
import LoginPage from './Component/LoginPage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './Component/Dashboard';

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }
function App() {
  // const { token, setToken } = useToken();
  // if (!token) {
  //   return <LoginPage setToken={setToken} />;
  // }
  return (
    <Router>
      <div>
        <Switch>
          <Route>
            <Route path='/Register' component={RegisterPage} exact />
            <Route path='/Dashboard' component={Dashboard} exact />
            <Route path='/LoginPage' component={LoginPage} exact />{' '}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
