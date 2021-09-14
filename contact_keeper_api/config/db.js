
const mongoose = require('mongoose');
//const config = require('config');
require('dotenv').config()
const URI = process.env.MONGOURI


const connectDB = async () => {
	try {
		console.log("URI",URI)
		mongoose.connect(URI,
			err => {
				if(err) throw err;
				console.log('connected to MongoDB')
			});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
