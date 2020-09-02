const express = require("express");
const UserModel = require("../schemas/userSchema");
const Comment = require("../schemas/comment");
const Post = require("../schemas/post");
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

	// Get likes(stars) counted
	let stars = 0;

	await Post.find({ userName: req.header("User-Name") })
		.select("approves")
		.then((res) => {
			let posts = [];
			res.forEach((element) => {
				posts.push(element);
			});

			posts.forEach((item) => {
				item.approves.forEach((item) => {
					// console.log(item.userName);
					stars++;
				});
			});
		});

	UserModel.findOne({ userName: req.header("User-Name") })
		.populate("contacts")
		.populate("imgbig")
		.then(async (result) => {
			let numberOfComments;
			await Comment.find({ userName: req.header("User-Name") })
				.select("userName")
				.then((res) => {
					numberOfComments = res.length;
				});
			let numberOfPosts;

			await Post.find({ userName: req.header("User-Name") })
				.select("userName")
				.then((res) => {
					numberOfPosts = res.length;
				});

			// console.log(result);

			res.status(200).json({
				dateJoined: result.dateJoined.toDateString(),
				verified: result.verified,
				isOnline: calcIsOnline(result.isOnline),
				numberOfComments,
				numberOfPosts,
				isListed: isFound,
				profilePic: {
					base64: result.imgbig.data.toString("base64"),
					mimetype: result.imgbig.contentType,
				},
				settings: { showOnline: result.settings.showOnline },
				stars,
			});
		})
		.catch(() => res.status(200).json({ status: "USER NOT FOUND" }));
});

module.exports = router;
