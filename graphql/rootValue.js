const UserModel = require("../schemas/userSchema");
const Post = require("../schemas/post");
const Comment = require("../schemas/comment");
const mailer = require("../functions/mailer");
const jwt = require("jsonwebtoken");
const config = require("config");

const cryptSecret = config.get("cryptSecret");
const notificationPUSH = require("../functions/notificationPUSH");

const postConverter = (args, res) => {
	// console.log(args);
	// console.log(res);
	return res.map((postas) => {
		let likedByMe = false;
		postas.approves.forEach((i) => {
			if (args.clientUserName === i.userName) likedByMe = true;
		});

		return {
			_id: postas._id,
			userName: postas.userName,
			textContent: postas.textContent,
			timestamp: postas.timestamp,
			edited: postas.edited,
			comments: [],

			imgsmall: {
				contentType: postas.imgsmall.contentType,
				data: postas.imgsmall.data.toString("base64"),
			},
			likesPack: {
				likes: postas.approves.length,
				likedByMe,
				approves: approvesConverter(postas),
			},
		};
	});
};

const approvesConverter = (post) => {
	const limit = 5;
	const approves = post.approves.map(async (element, i) => {
		if (i < limit)
			return {
				userName: element.userName,
				imgmicro: element.imgmicro.data.toString("base64"),
			};
	});

	return approves;
};

const rootValue = {
	addPost: async (args) => {
		let userResult;
		const decoded = jwt.verify(args.token, cryptSecret);
		// console.log(args);
		// console.log(decoded);
		await UserModel.findById(decoded.user_id).then((res) => {
			userResult = res;
		});

		// console.log(userResult);
		const post = new Post({
			userName: userResult.userName,
			textContent: args.textContent,
			imgsmall: userResult.imgsmall,
		});
		await post.save();
		return "OK";
	},

	getPosts: async (args) => {
		console.log(args);
		let post = [];
		let testPost = [];
		if (args.TYPE === "SINGLE") {
			await Post.find({ _id: args.target })
				.populate("imgsmall")
				.populate({
					path: "approves",
					populate: { path: "imgmicro", model: "ProfileImgMicro" },
				})
				.then((res) => {
					post = postConverter(args, res);
				});
			return post;
		}

		if (args.TYPE === "USER") {
			console.log(args);
			await Post.find({ userName: args.target })
				.populate("imgsmall")
				.populate({
					path: "approves",
					populate: { path: "imgmicro", model: "ProfileImgMicro" },
				})
				.then((res) => {
					// console.log(res);
					post = postConverter(args, res);
				});
			// console.log(post);
			return post;
		}

		if (args.TYPE === "FEED") {
			let testPost = [];
			feedPopulate = async () => {
				const promise = new Promise((resolve) => {
					UserModel.findOne(
						{ userName: args.clientUserName },
						async (err, user) => {
							await Promise.all(
								user.contacts.list.map(async (element) => {
									// console.log(element);
									await Post.find({ userName: element.userName })
										.populate("imgsmall")
										.populate({
											path: "approves",
											populate: { path: "imgmicro", model: "ProfileImgMicro" },
										})
										.then((res) => {
											testPost = postConverter(args, res);
											post = post.concat(testPost);
										});
								})
							).then(() => resolve());
						}
					).populate("contacts");
				});
				await promise; // wait until the promise resolves (*)
			};
			await feedPopulate();
			return post;
		}
	},

	likePost: async (args) => {
		console.log(args);
		let likesPack = {};
		await UserModel.findOne({ userName: args.userName }).then(async (user) => {
			await Post.findOne({ _id: args.id }).then(async (post) => {
				post.approves.push({
					userName: args.userName,
					imgmicro: user.imgmicro,
				});
				// console.log(post);
				await post.save();

				await Post.findOne({ _id: args.id })
					.populate({
						path: "approves",
						populate: { path: "imgmicro", model: "ProfileImgMicro" },
					})
					.then(async (post) => {
						likesPack.likes = post.approves.length;
						likesPack.likedByMe = true;
						likesPack.approves = approvesConverter(post);
					});
				notificationPUSH(
					post.userName,
					"POST_LIKE",
					args.userName,
					"",
					args.id
				);
			});
		});

		return likesPack;
	},

	editPost: async (args) => {
		let editTime;
		await Post.findByIdAndUpdate(
			args._id,
			{ textContent: args.textContent, edited: Date.now() },
			{ new: true }
		).then((res) => {
			editTime = res.edited;
		});

		return editTime;
	},

	sendComment: async (args) => {
		// console.log(args);
		let comment = {};
		let conv = {};
		await UserModel.findOne({ userName: args.userName })
			.populate("imgsmall")
			.then(async (user) => {
				// console.log(user);
				comment = new Comment({
					postID: args.postID,
					userName: args.userName,
					imgsmall: user.imgsmall._id,
					textContent: args.comment,
				});

				// await comment.save();

				conv = {
					_id: comment._id,
					userName: comment.userName,
					imgsmall: {
						contentType: user.imgsmall.contentType,
						data: user.imgsmall.data.toString("base64"),
					},
					textContent: comment.textContent,
				};
			});

		// console.log(conv);
		return [conv];
	},
};

module.exports = rootValue;
