const config = require("config");
const cryptSecret = config.get("cryptSecret");
const jwt = require("jsonwebtoken");
const UserModel = require("../schemas/userSchema");
const calcIsOnline = require("./calcIsOnline");

module.exports = (header) => {
	if (header)
		try {
			const decoded = jwt.verify(header, cryptSecret).user_id;
			UserModel.findOneAndUpdate(
				{ _id: decoded.toString() },
				{ isOnline: Date.now() }
			).then((res) => {
				// console.log(calcIsOnline(res.isOnline));
			});
		} catch (err) {
			console.log("ERROR FROM onlineStatusUpdate:");
		}
};
