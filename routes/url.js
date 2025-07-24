const express = require("express");
const router = express.Router();
const {
	handleGenerateNewShortUrl,
	handleRedirectToUrl,
	handleGetAnalytics,
	handleGetAllUrls,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortUrl);

router.get("/allurls", handleGetAllUrls);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/:shortId", handleRedirectToUrl);

module.exports = router;
