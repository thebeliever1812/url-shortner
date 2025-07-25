const mapSessionIdWithUser = new Map();

function setUser(id, user) {
	mapSessionIdWithUser.set(id, user);
}

function getUser(id) {
	return mapSessionIdWithUser.get(id);
}

module.exports = { setUser, getUser };
