const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
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
	  }
});

module.exports = mongoose.model('contact', ContactSchema);
