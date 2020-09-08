const express = require("express");
const UserModel = require("../schemas/userSchema");
const getConvertedItemsData = require("../functions/getConvertedItemsData");
const auth = require("../middleware/auth");
const ntf = require("../functions/ntf");
const loadItemsSpecs = require("../functions/loadItemsSpecs");
const itemsSpecs = loadItemsSpecs();

const router = express.Router();

const getItemsDataIndexOfItemName = (itemName) => {
	return itemsSpecs.findIndex((element) => element.name === itemName);
};

router.post("/", auth, (req, res) => {
	let thatWasTheLastItem = false;
	if (req.body.fromUser === req.body.toUser)
		res.status(500).json({ status: "INVALID REQUEST" });
	else {
		const sendItemID =
			itemsSpecs[getItemsDataIndexOfItemName(req.body.itemName)].id;

		UserModel.findOne({ userName: req.body.fromUser })
			.then((result) => {
				!result && res.status(500).json({ status: "USER NOT FOUND" });
				// console.log(result);

				const inStock =
					result.items[
						result.items.findIndex((element) => element.id === sendItemID)
					].amount;

				// changed < to <=
				if (req.body.amount < inStock) {
					result.items[
						result.items.findIndex((element) => element.id === sendItemID)
					].amount -= req.body.amount;
				} else if (req.body.amount == inStock) {
					thatWasTheLastItem = true;
					result.items.splice(
						result.items.findIndex((element) => element.id === sendItemID),
						1
					);
				} else res.status(500).json({ status: "INVALID REQUEST" });

				UserModel.findOne({ userName: req.body.toUser })
					.then((receiver) => {
						dbId = receiver.items.findIndex(
							(element) => element.id === sendItemID
						);
						if (dbId === -1)
							receiver.items.push({
								id: sendItemID,
								amount: parseInt(req.body.amount),
							});
						else receiver.items[dbId].amount += parseInt(req.body.amount);
						result.save();
						receiver.save();

						ntf(
							req.body.toUser,
							"USERLINK_TEXT",
							req.body.fromUser,
							`has sent you ${req.body.amount} ${req.body.itemName}${
								req.body.amount > 1 ? "s" : ""
							} :gift:`
						);

						const updatedItems = result.items.map((item) => {
							return Object.assign(getConvertedItemsData(item.id), {
								amount: item.amount,
							});
						});

						res.status(200).json({
							updatedItems: updatedItems,
							thatWasTheLastItem: thatWasTheLastItem,
						});
					})
					.catch((err) =>
						res.status(500).json({ status: "SERVER ERROR", err })
					);
			})
			.catch((err) => {
				res.status(500).json({ status: "SERVER ERROR", err });
			});
	}
});

module.exports = router;
