const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Chatntf = new Schema({
	userName: { type: String, default: "Simas" },

	chats: [
		{
			user: { type: String },
			lastMsg: { type: String },
			imgsmall: { type: mongoose.Schema.ObjectId, ref: "ProfileImgSmall" },
			seen: { type: Boolean, default: false },
			date: { type: Date, default: Date.now },
		},
	],
});

module.exports = mongoose.model("Chatntf", Chatntf);
