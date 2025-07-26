const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const connectMongoDb = require("./connectDb");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectMongoDb("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/", staticRoute);
app.use("/url", restrictTo(["normal", "admin"]), urlRoute);
app.use("/user", userRoute);

app.listen(PORT, (err) => {
	if (err) {
		return console.log(`Error in server starting ${err}`);
	}
	console.log(`Server started at PORT:${PORT}`);
});
