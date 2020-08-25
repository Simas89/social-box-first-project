const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const UserModel = require("../schemas/userSchema");
const userStateReturn = require("../functions/userStateReturn");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", (req, res) => {
	console.log(req.body);
	let isRememberMe = false;
	if (req.body.rememberMe) {
		isRememberMe = true;
	}
	const typeOfUserSearch = () => {
		console.log(2);
		if (req.body.aotoLogin) {
			console.log(2.1);
			const decoded = jwt.verify(req.body.aotoLogin, "UltraSecret");
			console.log(2.2);
			isRememberMe = true;
			return { _id: decoded.user_id };
		} else {
			console.log(2.3);
			return { userName_tlc: req.body.userName.toLowerCase() };
		}
	};
	console.log(3);

	UserModel.findOne(typeOfUserSearch(), (error, result) => {
		if (result) {
			let PASS = false;
			if (isRememberMe) {
				if (req.body.aotoLogin) {
					console.log("log in with token");
					PASS = true;
				} else {
					console.log("no auto token compare passwords");
					if (bcrypt.compareSync(req.body.userPsw, result.userPsw)) {
						PASS = true;
					} else {
						res.status(400).json({ status: "INVALID CREDENTIALS" });
					}
				}
			} else {
				console.log("compare passwords to pass");
				if (bcrypt.compareSync(req.body.userPsw, result.userPsw)) {
					PASS = true;
				} else {
					res.status(400).json({ status: "INVALID CREDENTIALS" });
				}
			}

			if (PASS) {
				// tokens stuff -START-
				jwt.sign(
					{ user_id: result._id },
					"UltraSecret",
					{ expiresIn: isRememberMe ? 100000000 : 360000 },
					(err, token) => {
						if (err) {
							console.log(err);
							res.status(500).json("ERROR GENERATING TOKEN");
						}
						res
							.status(200)
							.json(userStateReturn(result, "LOGGING IN", token, isRememberMe));
					}
				);
			}
		} else res.status(400).json({ status: "INVALID CREDENTIALS" });
		if (error) {
			res.status(400).json({ status: "DATABASE ERROR", err: error });
			console.log("Error: " + error);
		}
	}).populate("imgbig");
});

module.exports = router;
