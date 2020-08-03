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
			if (i.userName === args.userName) likedByMe = true;
			else likedByMe = false;
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
