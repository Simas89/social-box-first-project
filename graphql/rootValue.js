const UserModel = require("../schemas/userSchema");
const mailer = require("../functions/mailer");

const rootValue = {
	addPost: (args) => {
		console.log(args);
		return "Yes";
	},

	messageToMe: async (args) => {
		console.log(args);
		let mailSent = "";

		const myFirstPromise = new Promise((resolve, reject) => {
			mailer(
				"simasdevelopment@gmail.com",
				"Message from a visitor",
				JSON.stringify(args),
				(callback) => {
					if (callback === "OK") {
						resolve(callback);
					} else {
						reject(callback);
					}
				}
			);
		});

		await myFirstPromise
			.then((successMessage) => {
				console.log("Yay! " + successMessage);
				mailSent = successMessage;
			})
			.catch((failMessage) => {
				console.log("Fail " + failMessage);
				mailSent = failMessage;
			});

		return mailSent;
	},
	User: async (args) => {
		let userObj = { _id: "Hey" };

		await UserModel.findOne({ userName: args.name }).then((result) => {
			// console.log(result);
			userObj = {
				_id: result._id,
				userName: result.userName,
				credits: result.credits,
				verified: result.verified,
			};
		});
		return userObj;
	},
	Test: () => {
		return "Test text";
	},
};

module.exports = rootValue;
