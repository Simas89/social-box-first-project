const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileImgMicro = new Schema({
	use: String,
	data: Buffer,
	contentType: String,
});

module.exports = mongoose.model("ProfileImgMicro", profileImgMicro);
