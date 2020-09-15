const UserModel = require("../schemas/userSchema");
const Post = require("../schemas/post");
const Comment = require("../schemas/comment");
import Chat from "../schemas/chat";
const mailer = require("../functions/mailer");
const jwt = require("jsonwebtoken");
const calcIsOnline = require("../middleware/calcIsOnline");
const ntf = require("../functions/ntf");
require("dotenv").config();
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();
import { v4 as uuidv4 } from "uuid";
// console.log(uuidv4().toString());

const updateUserOnline = (userName) => {
	UserModel.findOneAndUpdate(
		{ userName },
		{ isOnline: Date.now() }
	).then((res) => {});
};

const commentConverter = (comments) => {
	return comments.map((comment) => {
		return {
			_id: comment._id,
			userName: comment.userName,
			imgsmall: {
				contentType: comment.imgsmall.contentType,
				data: comment.imgsmall.data.toString("base64"),
			},
			textContent: comment.textContent,
			timestamp: comment.timestamp,
			edited: comment.edited,
		};
	});
};

const postConverter = (args, res) => {
	// ntf();
	// console.log(args);
	// console.log(res);
	return res.map(async (postas) => {
		let likedByMe = false;
		postas.approves.forEach((i) => {
			if (args.clientUserName === i.userName) likedByMe = true;
		});

		let comments = [];
		await Comment.find({ postID: postas._id })
			.populate("imgsmall")
			.then((comment) => {
				comments = commentConverter(comment);
			});

		let isOnline;
		let canOnline;
		let isVerified;
		await UserModel.findOne({ userName: postas.userName })
			.lean()
			.select("isOnline")
			.select("settings")
			.select("verified")
			.then((res) => {
				isOnline = res.isOnline;
				canOnline = res.settings.showOnline;
				isVerified = res.verified;
			});

		return {
			_id: postas._id,
			userName: postas.userName,
			isVerified,
			textContent: postas.textContent,
			timestamp: postas.timestamp,
			isOnline: canOnline ? calcIsOnline(isOnline) : false,
			edited: postas.edited,
			comments,

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
	Subscription: {
		messages: {
			subscribe: (parent, args) => {
				console.log("sub-messages:", args);
				return pubsub.asyncIterator(args.userName);
			},
		},
		isTyping: {
			subscribe: (parent, args) => {
				console.log("sub-isTyping:", args);
				return pubsub.asyncIterator(args.userName + "isTyping");
			},
		},
	},
	Mutation: {
		postMessage: async (parent, args) => {
			updateUserOnline(args.userName);
			const stringid1 = args.userName + args.target;
			const stringid2 = args.target + args.userName;
			let messagesChat = [];

			await Chat.findOne()
				.or([{ stringid: stringid1 }, { stringid: stringid2 }])
				.then((res) => {
					if (res) {
						res.messages.push({
							id: uuidv4(),
							user: args.userName,
							content: args.content,
							date: Date.now(),
						});
						messagesChat = res.messages;
						res.save();
					} else {
						const chat = new Chat({
							stringid: stringid1,
							messages: [
								{
									id: uuidv4().slice(24),
									user: args.userName,
									content: args.content,
									date: Date.now(),
								},
							],
						});
						messagesChat = chat.messages;

						chat.save();
					}
				});

			// console.log(messagesChat);
			pubsub.publish(args.userName, {
				messages: { target: args.target, msg: messagesChat },
			});
			pubsub.publish(args.target, {
				messages: { target: args.userName, msg: messagesChat },
			});

			// return id;
		},
		updateIsTyping: (parent, args) => {
			console.log(args);
			pubsub.publish(args.target + "isTyping", {
				isTyping: {
					set: args.set,
					userName: args.userName,
				},
			});
		},
		deleteMsg: (parent, args) => {
			console.log(args);
			updateUserOnline(args.userName);
			const stringid1 = args.userName + args.target;
			const stringid2 = args.target + args.userName;
			Chat.findOne()
				.or([{ stringid: stringid1 }, { stringid: stringid2 }])
				.then((res) => {
					res.messages[args.index].content = "DELETED_MSG";
					res.save();

					pubsub.publish(args.userName, {
						messages: { target: args.target, msg: res.messages },
					});
					pubsub.publish(args.target, {
						messages: { target: args.userName, msg: res.messages },
					});
				});
		},
	},
	Query: {
		messages: async (parent, args) => {
			updateUserOnline(args.userName);
			const stringid1 = args.userName + args.target;
			const stringid2 = args.target + args.userName;
			let messagesChat = [];
			console.log(args, stringid1, stringid2);

			await Chat.findOne()
				.or([{ stringid: stringid1 }, { stringid: stringid2 }])
				.then((res) => {
					if (res) {
						messagesChat = res.messages;
					} else {
						const chat = new Chat({
							stringid: stringid1,
							messages: [],
						});
						messagesChat = chat.messages;
						chat.save();
					}
				});

			return {
				target: args.target,
				msg: messagesChat,
			};
		},
		test: () => {
			console.log("test query");
			pubsub.publish("Simas", {
				count: 100,
			});
			return 100;
		},
		addPost: async (parent, args) => {
			let userResult;
			const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
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

		getPosts: async (parent, args) => {
			// console.log(args);
			let post = [];
			let testPost = [];
			if (args.TYPE === "SINGLE") {
				console.log(args);
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
				const feedPopulate = async () => {
					const promise = new Promise((resolve) => {
						UserModel.findOne(
							{ userName: args.clientUserName },
							async (err, user) => {
								// console.log(user.contacts.list);
								//Adding current user to users contact list to get full feed of posts
								let feedUsersList = [
									...user.contacts.list,
									{ userName: args.clientUserName },
								];
								//
								await Promise.all(
									feedUsersList.map(async (element) => {
										// console.log(element);
										await Post.find({ userName: element.userName })
											.populate("imgsmall")
											.populate({
												path: "approves",
												populate: {
													path: "imgmicro",
													model: "ProfileImgMicro",
												},
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
				// console.log(posts);
				// setTimeout(() => {
				// 	console.log(post);
				// }, 10);

				return post;
			}
		},

		likePost: async (parent, args) => {
			console.log(args);
			let likesPack = {};
			await UserModel.findOne({ userName: args.userName }).then(
				async (user) => {
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
						ntf(post.userName, "POST_LIKE", args.userName, "", args.id);
					});
				}
			);

			return likesPack;
		},

		editPost: async (parent, args) => {
			console.log(args);
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

		delPost: async (parent, args) => {
			console.log("del post trig:", args);
			Post.findByIdAndDelete(args._id).then((res) => {});
			Comment.deleteMany({ postID: args._id }).then((res) => {});
		},

		sendComment: async (parent, args) => {
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

					// console.log(comment);

					comment.save();

					conv = {
						_id: comment._id,
						userName: comment.userName,
						imgsmall: {
							contentType: user.imgsmall.contentType,
							data: user.imgsmall.data.toString("base64"),
						},
						textContent: comment.textContent,
						timestamp: comment.timestamp,
						edited: comment.edited,
					};
					// receiver, format, link, text1, link2
					await Post.findById(args.postID).then((res) => {
						ntf(res.userName, "POST_COMMENT", args.userName, "", args.postID);
					});
				});

			// console.log(conv);
			return [conv];
		},

		editComment: async (parent, args) => {
			let editTime;
			await Comment.findByIdAndUpdate(
				args._id,
				{ textContent: args.textContent, edited: Date.now() },
				{ new: true }
			).then((res) => {
				editTime = res.edited;
			});

			return editTime;
		},

		delComment: async (parent, args) => {
			Comment.findByIdAndDelete(args._id).then((res) => {});
		},

		setOnlineParam: async (parent, args) => {
			// console.log(args);
			const param = args.param === "true" ? true : false;
			UserModel.findOneAndUpdate(
				{ userName: args.userName },
				{ settings: { showOnline: param } },
				{ new: true }
			)
				.select("settings")
				.then((res) => {
					// console.log(res);
					console.log(res);
				});
			return param;
		},

		/////
		emailMe: async (parent, args) => {
			console.log(args);
			mailer(
				"simasdevelopment@gmail.com",
				"A message from SimasZurauskas.dev",
				`
				Person: ${args.guest}.
				Email: ${args.email}.
				Message: ${args.msg}`,
				(callback) => {
					callback === "OK" && console.log("Oki doki");
				}
			);

			return "OK";
		},
	},
};

module.exports = rootValue;

// "@material-ui/core": "^4.11.0",
// "@material-ui/icons": "^4.9.1",
// "@testing-library/jest-dom": "^4.2.4",
// "@testing-library/react": "^9.5.0",
// "@testing-library/user-event": "^7.2.1",
