import React from 'react';
import RegisterPage from './Component/RegisterPage';
import LoginPage from './Component/LoginPage';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import Update from './Pages/Update';
import { useDispatch, useSelector } from 'react-redux'

const PrivateRoute = (props) => {
  console.log('PRIVATE ROUTE: ', props.path);
  return localStorage.getItem('token') ? (
    <Route {...props} />
  ) : (
    <Redirect to='/' />
  );
};
function App() {
  const userAuth = useSelector(state => state.authUser);
  const dispatch = useDispatch();
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/' component={LoginPage} exact />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Route path='/register' component={RegisterPage} />
          <Route path="/update/:_id" component={Update} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
