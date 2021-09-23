import React, { Component, useState } from 'react';
import RegisterPage from './Component/RegisterPage';
import LoginPage from './Component/LoginPage';
import Navbar from './Layout/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import Profile from './Layout/Profile';
import Update from './Pages/Update';
const PrivateRoute = (props) => {
  console.log('PRIVATE ROUTE: ', props.path);
  return localStorage.getItem('token') ? (
    <Route {...props} />
  ) : (
    <Redirect to='/' />
  );
};

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
          <Route path='/' component={LoginPage} exact />
          <PrivateRoute
            path='/dashboard'
            // sensitive={false}
            component={Dashboard}
            // exact
          />

          <Route
            path='/register'
            component={RegisterPage}
            // exact
          />
          
          <Route
            path="/update/:_id"
            component={Update}
            // exact
          />
          
        </Switch>
      </div>
    </Router>
  );
}
//  <Route path='/profile' component={Profile} exact />
// function PrivateRoute({ children, isAuthenticated, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={
//         ({ location }) => (
//           isAuthenticated
//             ? (
//               children
//             ) : (
//               <Redirect
//                 to={{
//                   pathname: '/Dashboard',
//                   state: { from: location }
//                 }}
//               />
//             ))
//       }
//     />
//   );
// }

export default App;
