require("dotenv").config();
const express = require("express");
const multer = require("multer");
const router = express.Router();
const config = require("config");

const Product = require("../models/Product");

const proImg = multer.diskStorage({
  destination: "./routes/products",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const products = multer({ storage: proImg });
router.use("/products", express.static("product"));
router.post("/products", products.single("productImage"), async (req, res) => {
  const { productName, productDescription, productPrice } = req.body;

  try {
    const newProduct = await Product.create({
      productName,
      productDescription,
      productPrice,
      productImage: req.file.filename,
    });
    res.status(200).json(newProduct);
    console.log("Product Response", newProduct);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/products",async(req,res)=>{
  try{
    const allProducts =await Product.find()
    res.status(200).json(allProducts);
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
  }


})
router.get("/productlist", async (req, res) => {
  let result = (await Product.find()).length;
  res.json(result);
});

router.get("/userproduct",async(req,res)=>{
  let result = await Product.find();
  res.json(result);
})

module.exports = router;
