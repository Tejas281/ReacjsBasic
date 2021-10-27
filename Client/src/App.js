import React from "react";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Users from "./Pages/Users";
import UpdateUser from "./Pages/Update";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout/Layout";
import Dashboard from "./Layout/UserCard";
import {
  Dashboard as DashboardIcon,
  Group,
  Info,
  Help,
  Add,
  FeaturedPlayListOutlined
} from "@material-ui/icons";
import Adduser from "./Pages/Adduser";
import ProductList from './Pages/Product/ProductList'
import About from "./Pages/About";
import { DeniedError } from "./Pages/Error";
import ProductAdd from "./Pages/Product/ProductAdd";
import UserProduct from "./Pages/UserProduct";
import Cart from "./Pages/Card/Cart";

const ProtectedRoute = ({ role = "admin", ...props }) => {
  console.log("Protected Route:", props.path);
  return JSON.parse(localStorage.getItem("token")).role === role ? (
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

function MainLayout() {
  const [role, setRole] = React.useState(
    JSON.parse(localStorage.getItem("token")).role
  );
  const adminNavigation = [
    {
      path: "/admin/users",
      name: "Users",
      icon: Group,
    },
    {
      path: "/productadd",
      name: "Product",
      icon: Add,
    },
    {
      path: "/productList",
      name: "Product List",
      icon: FeaturedPlayListOutlined,
    },
  ];

  const userNavigation = [
    {
      path: "/cart",
      name: "Cart Add",
      icon: FeaturedPlayListOutlined,
    }
  ];

  const navigation = [
    {
      path: role === "admin" ? "/admin/dashboard" : "/user/product",
      name: "Product",
      icon: DashboardIcon,
    },

    ...(role === "admin" ? adminNavigation : userNavigation),
    {
      path: "/about",
      name: "About",
      icon: Info,
    },
    {
      path: "/help",
      name: "Help",
      icon: Help,
    },
  ];

  return (
    <Layout navigation={navigation}>
      <Switch>
        <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} />
        <ProtectedRoute path="/admin/users" component={Users} exact />
        <Route path="/update/:_id" component={UpdateUser} exact />
        <Route path="/user/product" component={UserProduct} exact />
        <Route path="/productadd" component={ProductAdd} exact />
        <Route path="/productList" component={ProductList} exact />
        <Route path="/adduser" component={Adduser} exact />
        <Route path="/about" component={About} exact />
        <Route path="/cart" component={Cart} exact />
      
      </Switch>
    </Layout>
  );
}
function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute
          exact
          path="/error"
          component={DeniedError}
          role="user"
        />
        <Route path="/register" component={RegisterPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <PrivateRoute path="/" component={MainLayout} />
        <Route Path="/error" component={DeniedError} />
      </Switch>
    </Router>
  );
}
export default App;
