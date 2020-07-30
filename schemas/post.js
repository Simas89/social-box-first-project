const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema({
	// userID: { type: mongoose.Schema.ObjectId, ref: "UserModel" },
	userName: { type: String },
	textContent: { type: String },
	likes: { type: Number, default: 0 },
	imgsmall: { type: mongoose.Schema.ObjectId, ref: "ProfileImgSmall" },
	timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", Post);
