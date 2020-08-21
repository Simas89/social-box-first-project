const express = require("express");
const UserModel = require("../schemas/userSchema");
const calcIsOnline = require("../middleware/calcIsOnline");

const router = express.Router();

router.get("/", async (req, res) => {
	let isFound = false;
	await UserModel.findOne({ userName: req.header("CurrentUser") })
		.populate("contacts")
		.select("contacts")
		.then((res) => {
			// console.log(res.contacts.list);

			res.contacts.list.forEach((iii) => {
				if (iii.userName === req.header("User-Name")) isFound = true;
			});
			// console.log(isFound);
		});
	UserModel.findOne({ userName: req.header("User-Name") })
		.populate("contacts")
		.populate("imgbig")
		.then((result) => {
			// console.log(result);
			res.status(200).json({
				dateJoined: result.dateJoined.toDateString(),
				verified: result.verified,
				isOnline: calcIsOnline(result.isOnline),
				isListed: isFound,
				profilePic: {
					base64: result.imgbig.data.toString("base64"),
					mimetype: result.imgbig.contentType,
				},
				settings: { showOnline: result.settings.showOnline },
			});
		})
		.catch(() => res.status(200).json({ status: "USER NOT FOUND" }));
});

module.exports = router;
