const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const UserModel = require("../schemas/userSchema");
const userStateReturn = require("../functions/userStateReturn");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.post("/", (req, res) => {
	console.log(req.body);
	let isRememberMe = false;
	if (req.body.rememberMe) {
		isRememberMe = true;
	}
	const typeOfUserSearch = () => {
		if (req.body.aotoLogin) {
			const decoded = jwt.verify(req.body.aotoLogin, process.env.JWT_SECRET);

			isRememberMe = true;
			return { _id: decoded.user_id };
		} else {
			return { userName_tlc: req.body.userName.toLowerCase() };
		}
	};

	UserModel.findOne(typeOfUserSearch(), (error, result) => {
		// console.log(" RESULT: ", result);
		if (result) {
			let PASS = false;
			if (isRememberMe) {
				if (req.body.aotoLogin) {
					// console.log("log in with token");
					PASS = true;
				} else {
					// console.log("no auto token compare passwords");
					if (bcrypt.compareSync(req.body.userPsw, result.userPsw)) {
						PASS = true;
					} else {
						res.status(400).json({ status: "INVALID CREDENTIALS" });
					}
				}
			} else {
				// console.log("compare passwords to pass");
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
					process.env.JWT_SECRET,
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
