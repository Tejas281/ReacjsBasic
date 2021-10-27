import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../Store/Product/ProductAction";
import api from "../Utils/api";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function UserProduct() {
  const [expanded, setExpanded] = React.useState(false);
  const [cart, setCart] = useState();

  const products = useSelector(
    (state) => state?.ProductReducer?.ProductLists || null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const token = JSON.parse(localStorage.getItem("token")).token;

  const cartdata = (productId) => {
    api
      .post("/cart/addtocart", { productId })
      .then((res) => {
        setCart(res.data);
      })
      .catch((er) => {
        console.log("data Not Found For Card");
      });
  };

  return (
    <div>
      <Grid container spacing={3}>
        {products &&
          products?.map((k, product) => (
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
                    <FavoriteIcon/>
                  </IconButton>
                  <IconButton aria-label="share">
                    <AddShoppingCart  onClick={() => cartdata(k._id)} />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
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
}
