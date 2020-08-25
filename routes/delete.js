const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const UserModel = require("../schemas/userSchema");
const ContactsList = require("../schemas/contactsListMODEL");
const NotificationsList = require("../schemas/notificationsMODEL");
const ProfileImgMicro = require("../schemas/profileImgMicro");
const ProfileImgBig = require("../schemas/profileImgBig");
const Comment = require("../schemas/comment");
const Post = require("../schemas/post");

const router = express.Router();

router.get("/", (req, res) => {
	console.log(req.header("password"));
	UserModel.findOne({ userName: req.header("userName") })
		.then((result) => {
			console.log(result);
			if (bcrypt.compareSync(req.header("password"), result.userPsw)) {
				ContactsList.findByIdAndDelete(result.contacts).then(() => {});
				NotificationsList.findByIdAndDelete(
					result.notifications
				).then(() => {});
				ProfileImgMicro.findByIdAndDelete(result.imgmicro).then(() => {});
				// ProfileImgSmall.findByIdAndDelete(result.imgsmall).then(() => {});
				ProfileImgBig.findByIdAndDelete(result.imgbig).then(() => {});
				Comment.deleteMany({
					userName: req.header("userName"),
				}).then((res) => {});
				Post.deleteMany({
					userName: req.header("userName"),
				}).then((res) => {});
				result.delete().then((res) => {});
				res.status(200).json("OK");
			} else {
				res.status(200).json("Wrong password");
			}
		})
		.catch((err) => res.status(200).json(err));
});

module.exports = router;
