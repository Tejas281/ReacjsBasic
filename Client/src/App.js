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
        <Route path="/users" component={Users} exact />
        <Route path="/update/:_id" component={UpdateUser} exact />
        <Route path="/dashboard" component={Dashboard} exact />
      </Switch>
    </Layout>
  );
}
function App() {
  const userAuth = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  return (
    <Router>
      <Switch>
        <Route path="/register" component={RegisterPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <PrivateRoute path="/" component={MainLayout} />
      </Switch>
    </Router>
  );
}
export default App;
