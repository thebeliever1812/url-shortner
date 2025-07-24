const mongoose = require("mongoose");

async function connectMongoDb(url) {
	try {
		await mongoose.connect(url);
		console.log("MongoDB connected");
	} catch (error) {
		console.log(`Error MongoDb connection failed: ${error}`);
	}
}

module.exports = connectMongoDb;
