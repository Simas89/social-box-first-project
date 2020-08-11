const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Comment = new Schema({
	postID: { type: String },
	userName: { type: String },
	imgsmall: { type: mongoose.Schema.ObjectId, ref: "ProfileImgSmall" },
	textContent: { type: String },
	timestamp: { type: Date, default: Date.now },
	edited: Date,
});

module.exports = mongoose.model("Comment", Comment);
