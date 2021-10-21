import React from "react";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import Users from "./Pages/Users";
import UpdateUser from "./Pages/Update";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout/Layout";
import Dashboard from "./Layout/UserCard";
import { Dashboard as DashboardIcon, Group, Info, Help } from "@material-ui/icons";
import Adduser from "./Pages/Adduser"
import About from "./Pages/About"
import { DeniedError } from "./Pages/Error";

const ProtectedRoute = ({role='admin', ...props}) => {
  console.log("Protected Route:", props.path);
  return JSON.parse(localStorage.getItem('token')).role === role ? (
    <Route {...props} />
  ) : (
    <Redirect to="/error" />
  );
};

const ProtectedRoute1 = ({role='user', ...props}) => {
  console.log("Protected Route:", props.path);
  return JSON.parse(localStorage.getItem('token')).role === role ? (
    <Route {...props} />
  ) : (
    <Redirect to="/error" />
  );
};

const PrivateRoute = (props) => {
  return localStorage.getItem("token") ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
};
const navigation = [{
  path: '/dashboard',
  name: 'Dashboard',
  icon: DashboardIcon
}, {
  path: '/users',
  name: 'Users',
  icon: Group
}, {
  path: '/about',
  name: 'About',
  icon: Info
}, {
  path: '/help',
  name: 'Help',
  icon: Help
}];


function MainLayout() {
  return (
    <Layout navigation={navigation}>
      <Switch>
      <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} role='admin'/>
        <Route path="/users" component={Users} exact />
        <Route path="/update/:_id" component={UpdateUser} exact />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/adduser" component={Adduser} exact />
        <Route path="/about" component={About} exact />
      </Switch>
    </Layout>
  );
}
function App() {

  return (
    <Router>
      <Switch>
      <ProtectedRoute1 exact path="/error" component={DeniedError} role='user'/>
        <Route path="/register" component={RegisterPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <PrivateRoute path="/" component={MainLayout} />
        <Route Path="/error" component={DeniedError}  />
      </Switch>
    </Router>
  );
}
export default App;
