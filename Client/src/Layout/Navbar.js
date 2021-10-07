import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useLocation } from 'react-router-dom';

const Navbar = (props) => {
  const location = useLocation();
  return (
    <List>
      {(props.navigation || []).map((route, index) => {
        return (
          // <Link  to={route.path} key={index}>
            <ListItem button component={Link} to={route.path} selected={location.pathname === route.path} key={index}>
              <ListItemIcon >
               <route.icon />
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          // </Link>
        );
      })}
    </List>
  );
};

export default Navbar;
