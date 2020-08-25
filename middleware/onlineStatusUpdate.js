const jwt = require("jsonwebtoken");
const UserModel = require("../schemas/userSchema");
require("dotenv").config();

module.exports = (header) => {
	if (header)
		try {
			const decoded = jwt.verify(header, process.env.JWT_SECRET).user_id;
			UserModel.findOneAndUpdate(
				{ _id: decoded.toString() },
				{ isOnline: Date.now() }
			).then((res) => {});
		} catch (err) {
			console.log("ERROR FROM onlineStatusUpdate:");
		}
};
