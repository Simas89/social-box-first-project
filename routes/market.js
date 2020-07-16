const express = require("express");
const getConvertedItemsData = require("../functions/getConvertedItemsData");
const marketModel = require("../schemas/marketSchema");
const auth = require("../middleware/auth");

const router = express.Router();

//////  Load itemSpecs and convert their ids to marketItemsCodes
const loadItemsSpecs = require("../functions/loadItemsSpecs");
let marketItemsCodes = [];
loadItemsSpecs().forEach((element) => marketItemsCodes.push(element.id));

///// upload marketItemsCodes as initial market list
marketModel.exists({ name: "MARKET1" }, (error, result) => {
	if (!result) {
		const MARKET1 = marketModel({
			items: marketItemsCodes,
			lastUpdated: new Date(),
		});
		MARKET1.save();
	} else {
		marketModel.findOneAndUpdate(
			{ name: "MARKET1" },
			{ items: marketItemsCodes, lastUpdated: new Date() },
			{ useFindAndModify: false, new: true },
			() => {}
		);
	}
});

router.get("/", auth, (req, res) => {
	/////// convert existing market list to items
	const marketList = [];
	marketModel.findOne({ name: "MARKET1" }, (error, result) => {
		if (result) {
			result.items.forEach((element) =>
				marketList.push(getConvertedItemsData(element))
			);
			res.status(200).json(marketList);
		}
		if (!result) {
			res.status(200).json([]);
			console.log(error);
		}
	});
});

module.exports = router;
