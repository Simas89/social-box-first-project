const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileImgBig = new Schema({
	data: Buffer,
	contentType: String,
});

module.exports = mongoose.model("ProfileImgBig", profileImgBig);
