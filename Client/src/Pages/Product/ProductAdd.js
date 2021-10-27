import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import ProductList from "./ProductList";
import { useHistory } from "react-router";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const init = {
  productName: "",
  productDescription: "",
  productPrice: "",
  productImage: "",
};

export default function ProductAdd() {
  const [selectedImage, setSelectedImage] = useState();

  const [product, setProduct] = useState(init);
  const history = useHistory();

  const handlechange = (e) => {
    return setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  // This function will be triggered when the file field change
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productImage", selectedImage);
    for (let key in product) {
      formData.append(key, product[key]);
    }

    axios
      .post("http://localhost:5000/api/products/products", formData)
      .then((res) => {
        console.log("Product values is === >", init);
        console.log("data ist..........................................",res.data)
        return setProduct(init) , removeSelectedImage()   
           })
      .catch((err) => {
        console.log("data Not Found Product ");
      });
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 200, height: 200 }}>
                {selectedImage && (
                  <div style={styles.preview}>
                    <Img
                      src={URL.createObjectURL(selectedImage)}
                      style={styles.image}
                      alt="Thumb"
                      placeholder="Image"
                    />
                    <button onClick={removeSelectedImage} style={styles.delete}>
                      Remove This Image
                    </button>
                  </div>
                )}
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    <TextField
                      id="filled-basic"
                      label="Product Name"
                      variant="filled"
                      name="productName"
                      onChange={handlechange}
                      value={product.productName}
                      required
                    />
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <TextField
                      id="filled-basic"
                      label="Product Discription"
                      variant="filled"
                      name="productDescription"
                      onChange={handlechange}
                      value={product.productDescription}
                      required
                    />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <TextField
                      id="filled-basic"
                      label="Product Price"
                      name="productPrice"
                      variant="filled"
                      onChange={handlechange}
                      value = {product.productPrice}
                      required
                    />
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    value="Submit"
                    sx={{ cursor: "pointer" }}
                    variant="contained"
                    style={{ marginRight: "5px" }}
                  >
                    Submit
                  </Button>
                  <Button variant="contained" component="label">
                    Upload
                    <input
                      id="file"
                      name="productImage"
                      type="file"
                      hidden
                      className="form-control"
                      onChange={imageChange}
                      required
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
}

// Just some styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};
