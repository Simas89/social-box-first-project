const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../schemas/userSchema");
const mailer = require("../functions/mailer");
const auth = require("../middleware/auth");
require("dotenv").config();

const router = express.Router();

router.get("/", auth, (req, res) => {
	jwt.sign(
		{ user_id: req.decoded, email: req.header("email") },
		process.env.JWT_SECRET,
		{ expiresIn: 86400 },
		(err, token) => {
			if (err) {
				console.log(err);
				res.status(500).json({ status: "ERROR GENERATING TOKEN" });
			} else {
				console.log(req.header("email"));
				mailer(
					req.header("email"),
					"My Container account verification",
					`Please follow this link to verify your account: http://www.simaszurauskas.dev/verification/confirm/${token}
					Please note that link will expire in next 24h`,
					(callback) => {
						callback === "OK" &&
							res.status(200).json({ status: "Activation link has been sent" });
					}
				);
			}
		}
	);
});

router.get("/confirm/:id", async (req, res) => {
	const decoded = jwt.verify(req.params.id, "secret");

	await UserModel.findById(decoded.user_id, (error, result) => {
		if (error) {
			res.status(400).send(`<h3>Error: User could not be identified</h3>
			<a href='http://www.simaszurauskas.dev/login'>Back to log in</a>`);
			console.log(error);
		} else {
			result.email = decoded.email;
			result.verified = true;
			result.save((error, result) => {
				if (error) {
					res.status(400).send(`<h3>Error: User could not be updated</h3>
					<a href='http://www.simaszurauskas.dev/login'>Back to log in</a>`);
					console.log(error);
				} else
					res.status(200).send(`<h3>Email verified</h3>
				<a href='http://www.simaszurauskas.dev/login'>Back to your account</a>`);
			});
		}
	});
	//
});

module.exports = router;
