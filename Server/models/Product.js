const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

        productImage :{
            data:Buffer,
            type:String,
        },
        productName:{
            type:String,
        },
        productDescription:{
            type:String,
        },
        productPrice:{
            type:String,
        }
});

module.exports = mongoose.model('productss', ProductSchema);
