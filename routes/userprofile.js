const express = require("express");
const UserModel = require("../schemas/userSchema");
const calcIsOnline = require("../middleware/calcIsOnline");

const router = express.Router();

router.get("/", (req, res) => {
	UserModel.findOne({ userName: req.header("User-Name") })
		.populate("contacts")
		.populate("imgbig")
		.then((result) => {
			// console.log(result);
			res.status(200).json({
				dateJoined: result.dateJoined.toDateString(),
				verified: result.verified,
				isOnline: calcIsOnline(result.isOnline),
				profilePic: {
					base64: result.imgbig.data.toString("base64"),
					mimetype: result.imgbig.contentType,
				},
			});
		})
		.catch(() => res.status(200).json({ status: "USER NOT FOUND" }));
});

module.exports = router;
