const jwt = require("jsonwebtoken");
const UserModel = require("../schemas/userSchema");

module.exports = (header) => {
	console.log("im here");
	if (header)
		try {
			const decoded = jwt.verify(header, "UltraSecret").user_id;
			UserModel.findOneAndUpdate(
				{ _id: decoded.toString() },
				{ isOnline: Date.now() }
			).then((res) => {});
		} catch (err) {
			console.log("ERROR FROM onlineStatusUpdate:");
		}
};
