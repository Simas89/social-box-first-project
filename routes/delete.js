const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const UserModel = require("../schemas/userSchema");
const ContactsList = require("../schemas/contactsListMODEL");
const NotificationsList = require("../schemas/notificationsMODEL");
const ProfileImgMicro = require("../schemas/profileImgMicro");
import ProfileImgSmall from "../schemas/profileImgSmall";
const ProfileImgBig = require("../schemas/profileImgBig");
const Comment = require("../schemas/comment");
const Post = require("../schemas/post");
import Chat from "../schemas/chat";

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
				Chat.findOneAndDelete({
					stringid: {
						$regex: `${result.userName}`,
					},
				}).then((res) => console.log(res));
				NotificationsList.find().then((res) => {
					res.forEach((element) => {
						console.log(element);
					});
				});
				ContactsList.find().then((res) => {
					res.forEach((element) => {
						let index = -1;
						element.list.forEach((sub, i) => {
							if (sub.userName === result.userName) {
								// console.log("Found at", i);
								index = i;
							}
						});
						if (index !== -1) {
							console.log("executing at", element._id, index);
							ContactsList.findById(element._id).then((res) => {
								res.list.splice(index, 1);
								res.save();
							});
						}
					});
				});

				result.delete().then((res) => {});
				res.status(200).json("OK");
			} else {
				res.status(200).json("Wrong password");
			}
		})
		.catch((err) => res.status(200).json(err));
});

module.exports = router;
