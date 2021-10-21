const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
 
  profilefile: {
    data: Buffer,
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    default:'user',
  }
});

module.exports = mongoose.model('user', UserSchema);
