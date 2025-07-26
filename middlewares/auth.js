const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
	const userUid = req.cookies.uid;

	if (!userUid) {
		return res.redirect("/login");
	}
	const user = getUser(userUid);

	if (!user) return res.redirect("/login");
	req.user = user;
	next();
}

async function checkAuth(req, res, next) {
	// For Stateful Auth
	// const userUid = req.cookies.uid;
	// const user = getUser(userUid);

	// For Stateless Auth
	const userToken = req.cookies.uid;
	const user = getUser(userToken);
	req.user = user;
	next();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
