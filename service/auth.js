// Stateful Auth - only required in stateful authentication to maintain the state

// const mapSessionIdWithUser = new Map();

// function setUser(id, user) {
// 	mapSessionIdWithUser.set(id, user);
// }

// function getUser(id) {
// 	return mapSessionIdWithUser.get(id);
// }

// module.exports = { setUser, getUser };

// Stateless Auth

const jwt = require("jsonwebtoken");
const secret = "Basir@7982";

function setUser(user) {
	return jwt.sign(
		{
			_id: user._id,
			email: user.email,
			role: user.role
		},
		secret,
		{ expiresIn: "1d" }
	);
}

function getUser(token) {
	try {
		return jwt.verify(token, secret);
	} catch (error) {
		return null;
	}
}

module.exports = { setUser, getUser };
