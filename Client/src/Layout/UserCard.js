import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {getcount} from "../Store/CoustUser/CounstUserAction";

export const UsersCard = () => {
  const dispatch = useDispatch();

  const Users=useSelector((state) => state?.count?.UsersValues || 0);
  console.log("+++++++Users+++++" , Users)
  useEffect(() => { 
    dispatch(getcount());
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
