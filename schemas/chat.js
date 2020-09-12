const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Chat = new Schema({
	stringid: { type: String },

	messages: [
		{
			id: { type: Number },
			user: { type: String },
			content: { type: String },
		},
	],
});

module.exports = mongoose.model("Chat", Chat);
