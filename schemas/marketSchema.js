const mongoose = require("mongoose");

const marketSchema = mongoose.Schema({
	name: { type: String, default: "MARKET1" },
	items: [Number],
	lastUpdated: Date,
});

module.exports = mongoose.model("marketModel", marketSchema);
