const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationsList = new Schema({
	list: [
		{
			timestamp: { type: Date, default: Date.now },
			isSeen: { type: Boolean, default: false },
			messageBody: {
				format: { type: String, default: "USERLINK_TEXT" },
				link: { type: String, default: "" },
				text1: { type: String, default: "" },
			},
			imgMini: { data: Buffer, contentType: String },
		},
	],
});

module.exports = mongoose.model("NotificationsList", NotificationsList);
