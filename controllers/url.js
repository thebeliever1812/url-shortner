const Url = require("../models/url");
const { nanoid } = require("nanoid");

async function handleGenerateNewShortUrl(req, res) {
	try {
		const body = req.body;
		if (!body.redirectUrl) {
			return res.status(400).json({ error: "Url is required" });
		}
		const shortId = nanoid(8);
		await Url.create({
			shortId: shortId,
			redirectUrl: body.redirectUrl,
			timeStamp: [],
			createdBy: req.user._id
		});
		res.status(200).render("home", {
			shortUrl: `http://localhost:8000/url/${shortId}`,
		});
	} catch (error) {
		console.log(`Error creating short id: ${error}`);
		res.status(500).json({ error: error });
	}
}

async function handleRedirectToUrl(req, res) {
	try {
		const shortId = req.params.shortId;
		const entry = await Url.findOneAndUpdate(
			{ shortId },
			{
				$push: {
					visitHistory: {
						timeStamp: Date.now(),
					},
				},
			}
		);
		if (!entry) {
			return res.status(400).json({ error: "Not found" });
		}
		res.status(200).redirect(entry.redirectUrl);
	} catch (error) {
		console.log(`Error getting entry : ${error}`);
		res.status(500).json("Server error");
	}
}

async function handleGetAnalytics(req, res) {
	try {
		const shortId = req.params.shortId;
		const result = await Url.findOne({ shortId });
		if (!result) {
			res.status(400).json({ error: "Not found" });
		}
		res.status(200).json({
			totalClicks: result?.visitHistory?.length,
			analytics: result?.visitHistory,
		});
	} catch (error) {
		console.log(`Error getting analytics: ${error}`);
		res.status(500).json({ error: error });
	}
}

async function handleGetAllUrls(req, res) {
	try {
		const allUrls = await Url.find({});
		if (!allUrls) {
			res.status(400).json({ error: "Bad request" });
		}
		res.render("home", {
			urls: allUrls,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error });
	}
}

module.exports = {
	handleGenerateNewShortUrl,
	handleRedirectToUrl,
	handleGetAnalytics,
	handleGetAllUrls,
};
