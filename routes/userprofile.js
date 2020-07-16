const express = require("express");
const UserModel = require("../schemas/userSchema");
const calcIsOnline = require("../middleware/calcIsOnline");

const router = express.Router();

router.get("/", (req, res) => {
	UserModel.findOne({ userName: req.header("User-Name") })
		.populate({
			path: "contacts",
		})
		.then((result) => {
			res.status(200).json({
				dateJoined: result.dateJoined.toDateString(),
				verified: result.verified,
				isOnline: calcIsOnline(result.isOnline),
				profilePic: {
					base64: result.img.data.toString("base64"),
					mimetype: result.img.contentType,
				},
			});
		})
		.catch(() => res.status(500).json({ status: "USER NOT FOUND" }));
});

module.exports = router;
