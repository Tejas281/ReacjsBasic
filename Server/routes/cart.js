const router = require("express").Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Cart = require("../models/Cart");
router.get("/getcart", auth, async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    { $unwind: "$items" },
    { $project: { productId: "$items.productId", userId: 1 } },
    {
      $lookup: {
        from: "productsses",
        localField: "productId",
        foreignField: "_id",
        as: "item",
      },
    },
    { $unwind: "$item" },
    {
      $group: {
        _id: "$_id",
        items: { $push: "$item" },
      },
    },
  ]);
  if (!cart || !cart.length) {
    res.status(404).json({ message: "cart is empty or not found" });
  }
  return res.json(cart[0]);
});

router.post("/addtocart", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const item = {
      productId: req.body.productId,
    };
    var cart = await Cart.findOne({ userId: userId });
    // this is condition
    if (!cart) {
      var cart = new Cart({
        userId: userId,
        items: [],
      });
    }
    cart.items.push(item);
    await cart.save();
    return res.json(cart);
    // here you have to add item to the document
  } catch (error) {
    console.log("data not found", error);
  }
});

router.delete("/item/:id", auth, async (req, res) => {
  const userId = req.user.id;
  
  const productId = req.params.id;
  const cart = await Cart.findOne({userId: userId});
  // const cart = await Cart.findOne(userId);
  console.log("==============",cart.items)

  if (cart) {
    cart.items = cart.items.filter((item) => item.productId != productId);
    await cart.save();
  }
  res.json(cart);
});

module.exports = router;
