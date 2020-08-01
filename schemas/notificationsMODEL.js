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
			img: { type: mongoose.Schema.ObjectId, ref: "ProfileImgSmall" },
		},
	],
});

module.exports = mongoose.model("NotificationsList", NotificationsList);
