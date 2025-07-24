const express = require("express");
const router = express.Router();
const {handleGenerateNewShortUrl} = require('../controllers/url')

router.route("/").post(handleGenerateNewShortUrl);

// router.route("/:id").get().patch().delete();

module.exports = router
