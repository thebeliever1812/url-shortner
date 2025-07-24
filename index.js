const express = require("express");
const urlRoute = require("./routes/url");
const connectMongoDb = require("./connectDb");

const app = express();
const PORT = 8000;

connectMongoDb("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, (err) => {
	if (err) {
		console.log(`Error in server starting ${err}`);
	}
	console.log(`Server started at PORRT:${PORT}`);
});
