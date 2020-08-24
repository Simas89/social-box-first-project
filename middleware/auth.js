const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	const token = req.header("x-auth-token");
	if (!token)
		return res.status(401).json("status: NO TOKEN, AUTHORIZATION DENIED");

	try {
		const decoded = jwt.verify(token, "UltraSecret");
		req.decoded = decoded.user_id;
		next();
	} catch (err) {
		res.status(401).json({ status: "TOKEN IS NOT VALID" });
	}
};
