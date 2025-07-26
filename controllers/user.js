const User = require("../models/user");
// const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).render("signup", {
				error: "All fields required",
			});
		}
		await User.create({
			name,
			email,
			password,
		});
		res.status(200).redirect("/login");
	} catch (error) {
		console.log("Signup error:", error);
		res.status(500).send("Internal Server Error");
	}
}

async function handleUserLogin(req, res) {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email, password });
		if (!user) {
			return res.status(404).render("login", {
				error: "User not found: Invalid email or password",
			});
		}

		// In case of Stateful Auth
		// const sessionId = uuidv4();
		// setUser(sessionId, user);
		// res.cookie("uid", sessionId);

		// In case of Stateless Auth
		const token = setUser(user);
		res.cookie("uid", token);

		return res.status(200).redirect("/");
	} catch (error) {
		console.log("Login error: ", error);
		res.status(500).send("Internal server error");
	}
}

module.exports = { handleUserSignup, handleUserLogin };
