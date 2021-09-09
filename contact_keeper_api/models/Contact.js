const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	phone: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	gender:
	{
		type: String,
		required:true
	},
	password:
	{
		type: String,
		required:true

	}
});

module.exports = mongoose.model('contact', ContactSchema);
