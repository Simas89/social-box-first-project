const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const UserModel = require("../schemas/userSchema");
const userStateReturn = require("../functions/userStateReturn");
const jwt = require("jsonwebtoken");
const config = require("config");
const cryptSecret = config.get("cryptSecret");

const router = express.Router();

router.post("/", (req, res) => {
	console.log(req.body);
	let isRememberMe = false;
	req.body.rememberMe && (isRememberMe = true);
	const typeOfUserSearch = () => {
		if (req.body.aotoLogin) {
			const decoded = jwt.verify(req.body.aotoLogin, cryptSecret);
			isRememberMe = true;
			return { _id: decoded.user_id };
		} else {
			return { userName_tlc: req.body.userName.toLowerCase() };
		}
	};

	UserModel.findOne(typeOfUserSearch(), (error, result) => {
		if (result) {
			// console.log(result);
			if (
				isRememberMe === false
					? bcrypt.compareSync(req.body.userPsw, result.userPsw)
					: true
			) {
				// tokens stuff -START-
				jwt.sign(
					{ user_id: result._id },
					cryptSecret,
					{ expiresIn: isRememberMe ? 100000000 : 360000 },
					(err, token) => {
						if (err) {
							console.log(err);
							res.status(500).json("ERROR GENERATING TOKEN");
						}
						res.status(200).json(
							userStateReturn(
								result,
								"LOGGING IN",
								token,
								// set to true if rememberMe: true ot aotoLogin
								isRememberMe
							)
						);
					}
				);
				result.save();

				// tokens stuff -END-
			} else res.status(400).json({ status: "WRONG PASSWORD" }); // invalid credentials
		} else res.status(400).json({ status: "USER COULD NOT BE IDENTIFIED" });
		if (error) {
			res.status(400).json({ status: "DATABASE ERROR", err: error });
			console.log("Error: " + error);
		}
	});
});

module.exports = router;
