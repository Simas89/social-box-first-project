const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Chat = new Schema({
	stringid: { type: String },
	seen: {},

	messages: [
		{
			id: { type: String },
			user: { type: String },
			content: { type: String },
			// seen: { type: Boolean, default: false },
			date: { type: Date, default: Date.now },
		},
	],
});

module.exports = mongoose.model("Chat", Chat);
