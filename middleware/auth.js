const jwt = require("jsonwebtoken");
const config = require("config");
const cryptSecret = config.get("cryptSecret");

module.exports = function (req, res, next) {
	const token = req.header("x-auth-token");
	if (!token)
		return res.status(401).json("status: NO TOKEN, AUTHORIZATION DENIED");

	try {
		const decoded = jwt.verify(token, cryptSecret);
		req.decoded = decoded.user_id;
		next();
	} catch (err) {
		res.status(401).json({ status: "TOKEN IS NOT VALID" });
	}
};
