const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileImgSmall = new Schema({
	use: String,
	data: Buffer,
	contentType: String,
});

module.exports = mongoose.model("ProfileImgSmall", profileImgSmall);
