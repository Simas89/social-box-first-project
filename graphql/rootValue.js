const UserModel = require("../schemas/userSchema");

const rootValue = {
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
