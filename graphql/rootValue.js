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
			if (args.userName === i.userName) likedByMe = true;
			// console.log(args.userName, i.userName);
		});

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
		console.log(args);
		let post = [];
		let testPost = [];
		if (args.TYPE === "SINGLE") {
			await Post.find({ _id: args.id })
				.populate("imgsmall")
				.then((res) => {
					post = postConverter(args, res);
				});
			return post;
		}

		if (args.TYPE === "USER") {
			await Post.find({ userName: args.userName })
				.populate("imgsmall")
				.then((res) => {
					post = postConverter(args, res);
				});
			return post;
		}

		if (args.TYPE === "FEED") {
			let testPost = [];

			async function f() {
				let promise = new Promise((resolve, reject) => {
					UserModel.findOne({ userName: args.userName }, async (err, user) => {
						await Promise.all(
							user.contacts.list.map(async (element) => {
								// console.log(element);
								await Post.find({ userName: element.userName })
									.populate("imgsmall")
									.then((res) => {
										console.log(res.length);
										testPost = postConverter(args, res);
										post = post.concat(testPost);
									});
							})
						).then(() => resolve());
					}).populate("contacts");
				});

				await promise; // wait until the promise resolves (*)
			}
			await f();

			// await Post.find({ userName: args.userName })
			// 	.populate("imgsmall")
			// 	.then((res) => {
			// 		const post0 = postConverter(args, res);
			// 		post = post.concat(post0);
			// 	});
			// console.log("POST:", post);
			// console.log(val);
			// console.log(testArr);
			// console.log("RETURN");
			return post;
		}
	},

	likePost: async (args) => {
		console.log(args);
		let likes = null;
		await UserModel.findOne({ userName: args.userName }).then(async (user) => {
			await Post.findById(args.id).then((post) => {
				// if (
				// 	post.approves.findIndex((iii) => iii.userName === args.userName) ===
				// 	-1
				// ) {
				post.approves.unshift({
					userName: args.userName,
					imgmicro: user.imgmicro,
				});
				console.log(post);
				post.save();
				// }
				likes = post.approves.length;
			});
		});

		return { likes, likedByMe: true };
	},
};

module.exports = rootValue;
