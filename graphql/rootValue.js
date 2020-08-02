const UserModel = require("../schemas/userSchema");
const Post = require("../schemas/post");
const mailer = require("../functions/mailer");

const jwt = require("jsonwebtoken");
const config = require("config");
const cryptSecret = config.get("cryptSecret");

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
		let post = [{ imgsmall: {} }];
		if (args.TYPE === "SINGLE") {
			await Post.findById(args.id)
				.populate("imgsmall")
				.then((res) => {
					console.log(res);
					post[0]._id = res._id;
					post[0].userName = res.userName;
					post[0].textContent = res.textContent;
					post[0].likes = res.likes;
					post[0].timestamp = res.timestamp;
					post[0].imgsmall.contentType = res.imgsmall.contentType;
					post[0].imgsmall.data = res.imgsmall.data.toString("base64");
				});

			// console.log("POST:", post);
			return post;
		}
		if (args.TYPE === "USER") {
			await Post.find({ userName: args.id })
				.populate("imgsmall")
				.then((res) => {
					// console.log(res);

					post = res.map((postas) => {
						let likedByMe = false;
						postas.approves.forEach((i) => {
							if (i.userName === args.id) likedByMe = true;
							else likedByMe = false;
						});

						return {
							_id: postas._id,
							userName: postas.userName,
							textContent: postas.textContent,
							likes: postas.approves.length,
							timestamp: postas.timestamp,

							imgsmall: {
								contentType: postas.imgsmall.contentType,
								data: postas.imgsmall.data.toString("base64"),
							},

							likedByMe,
						};
					});
				});

			// console.log("POST:", post);
			return post;
		}
	},

	likePost: async (args) => {
		console.log(args);
		let returnAndUpdate = false;
		await UserModel.findOne({ userName: args.userName }).then(async (user) => {
			await Post.findById(args.id).then((post) => {
				if (
					post.approves.findIndex((iii) => iii.userName === args.userName) ===
					-1
				) {
					post.approves.unshift({
						userName: args.userName,
						imgmicro: user.imgmicro,
					});
					console.log(post);
					post.save();
					returnAndUpdate = post.approves.length;
				}
			});
		});

		return returnAndUpdate;
	},
};

module.exports = rootValue;
