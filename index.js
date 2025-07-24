const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const connectMongoDb = require("./connectDb");
const staticRoute = require("./routes/staticRoute");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectMongoDb("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", staticRoute);

app.use("/url", urlRoute);

app.listen(PORT, (err) => {
	if (err) {
		console.log(`Error in server starting ${err}`);
	}
	console.log(`Server started at PORRT:${PORT}`);
});
