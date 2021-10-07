import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { countUser } from "../Store/Users/CountUser";

export const UsersCard = () => {
  const dispatch = useDispatch();

  const Users= useSelector((state) => state.count.UsersValues || null);
  //const users = useSelector((state) => state?.users?.users?.length || 0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if(!Users){
    axios
      .get("http://localhost:5000/api/users/usersdata")
      .then((res) => {
        dispatch(countUser(res.data));
      })
    }
  }, []);
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Users
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Users}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
export default UsersCard;
