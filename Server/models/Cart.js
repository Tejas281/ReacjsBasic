const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const COLLECTION = 'cart';

const ProductSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, unique: true, ref: "productss" },
      quntity: Number
    },
  ],
}, 
// {
//   collation: COLLECTION,
//   timestamps: {
//     createdAt: 'createdDate',
//     updatedAt: 'updatedDate'
//   }
// }
);

module.exports = mongoose.model('cart', ProductSchema);
