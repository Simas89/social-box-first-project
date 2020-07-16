const express = require("express");
const UserModel = require("../schemas/userSchema");

const router = express.Router();

router.get("/", (req, res) => {
	UserModel.findOne({ userName: req.header("userName") })
		.then((result) => {
			result.isOnline = Date.now() - 60000;
			result.save();
		})
		.then(() => res.status(200).json("Logout"))
		.catch((err) => res.status(200).json(err));
});

module.exports = router;
