const UserModel = require("../schemas/userSchema");
const Post = require("../schemas/post");
const mailer = require("../functions/mailer");

const jwt = require("jsonwebtoken");
const config = require("config");
const cryptSecret = config.get("cryptSecret");

const rootValue = {
	getPosts: async (args) => {
		// console.log(args);
		let post = { imgsmall: {} };
		if (args.TYPE === "SINGLE") {
			await Post.findById(args.postID, (err, res) => {
				console.log(res);
				post._id = res._id;
				post.userName = res.userName;
				post.textContent = res.textContent;
				post.likes = res.likes;
				post.timestamp = res.timestamp;
				post.imgsmall.contentType = res.imgsmall.contentType;
				post.imgsmall.data = res.imgsmall.data.toString("base64");
			}).populate("imgsmall");

			// console.log(post);
			return [post];
		}
	},

	// IN USE!
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
		post.save();
		// console.log(post);

		return "OK";
	},
	UserTest: async (args) => {
		await UserModel.findOne({ userName: args.name }, (err, res) => {
			res.populate("contacts");
		});
		// .populate("imgsmall");

		return "Back from User";
	},
};

module.exports = rootValue;
