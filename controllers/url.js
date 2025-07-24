const Url = require("../models/url");
const { nanoid } = require("nanoid");

async function handleGenerateNewShortUrl(req, res) {
	try {
		const body = req.body;
		if (!body.url) {
			res.status(400).json({ error: "Url is required" });
		}
		const shortId = nanoid(8);
		await Url.create({
			shortId: shortId,
			redirectUrl: body.url,
			timeStamp: [],
		});
		res.status(200).json({ id: shortId });
	} catch (error) {
		console.log(`Error creating short id: ${error}`);
		res.status(500).json({ error: error });
	}
}

module.exports = { handleGenerateNewShortUrl };
