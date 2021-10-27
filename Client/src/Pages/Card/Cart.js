import React, { useEffect, useState } from "react";
import api from "../../Utils/api";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const produt = useSelector(
    (state) => state?.ProductReducer?.ProductLists || null
  );
  useEffect(() => {
    api
      .get("/cart/getcart")
      .then((res) => {
        console.log("Responsessssss", res.data);
        setCart(res.data);
      })
      .catch((err) => {
        console.log("card Values not Found", err);
      });
  }, []);
  //     if(cart.productId === produt._id){
  //     setDemo(produt)
  //    }

  return (
    <div>
      <Grid container spacing={3}>
        {cart &&
          cart?.items?.map((k, product) => (
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }} key={product}>
                <CardHeader
                  avatar={
                    <Avatar
                      src={
                        k?.productImage &&
                        `http://localhost:5000/products/${k?.productImage}`
                      }
                      aria-label="recipe"
                    >
                      <img alt="" />
                    </Avatar>
                  }
                  title={k.productName}
                />

                <CardMedia
                  component="img"
                  height="194"
                  image={
                    k?.productImage &&
                    `http://localhost:5000/products/${k?.productImage}`
                  }
                  alt={k.productName}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Info: {k?.productDescription}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Price: {k?.productPrice}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to Card">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <AddShoppingCart />
                  </IconButton>
                </CardActions>
                <Collapse timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Method:</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Cart;
