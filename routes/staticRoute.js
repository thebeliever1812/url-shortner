const express = require("express");
const router = express.Router();
const Url = require("../models/url");

router.get("/", async (req, res) => {
	if (req.user) {
		const allUrls = await Url.find({ createdBy: req.user._id });
		return res.render("home", {
			urls: allUrls,
		});
	}
	return res.redirect("/login");
});

router.get("/signup", (req, res) => {
	return res.render("signup");
});

router.get("/login", (req, res) => {
	return res.render("login");
});

module.exports = router;
