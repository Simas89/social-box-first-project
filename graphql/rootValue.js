const UserModel = require("../schemas/userSchema");
const Post = require("../schemas/post");
const mailer = require("../functions/mailer");

const jwt = require("jsonwebtoken");
const config = require("config");
const post = require("../schemas/post");
const cryptSecret = config.get("cryptSecret");

const postConverter = (args, res) => {
	return res.map((postas) => {
		let likedByMe = false;
		postas.approves.forEach((i) => {
			if (args.clientUserName === i.userName) likedByMe = true;
		});

		// console.log(postas.approves);

		const approves = postas.approves.map((element) => {
			// console.log(element.imgmicro.data.toString("base64"));
			return {
				userName: element.userName,
				imgmicro: element.imgmicro.data.toString("base64"),
			};
		});
		// console.log(approves);

		return {
			_id: postas._id,
			userName: postas.userName,
			textContent: postas.textContent,
			timestamp: postas.timestamp,

			imgsmall: {
				contentType: postas.imgsmall.contentType,
				data: postas.imgsmall.data.toString("base64"),
			},
			likesPack: {
				likes: postas.approves.length,
				likedByMe,
				approves: approves,
			},
		};
	});
};

const rootValue = {
	addPost: async (args) => {
		let userResult;
		const decoded = jwt.verify(args.token, cryptSecret);
		// console.log(args);
		// console.log(decoded);
		await UserModel.findById(decoded.user_id).then((res) => {
			// console.log(res);
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
		// console.log(args);
		let post = [];
		let testPost = [];
		if (args.TYPE === "SINGLE") {
			await Post.find({ _id: args.target })
				.populate("imgsmall")
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
				post.approves.unshift({
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
						const approves = post.approves.map(async (element) => {
							// console.log(element.imgmicro.data.toString("base64"));
							return {
								userName: element.userName,
								imgmicro: element.imgmicro.data.toString("base64"),
							};
						});
						likesPack.likes = post.approves.length;
						likesPack.likedByMe = true;
						likesPack.approves = approves;
					});
			});
		});

		return likesPack;
	},
};

module.exports = rootValue;
