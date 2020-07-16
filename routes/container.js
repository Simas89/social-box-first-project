const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../schemas/userSchema");
const userStateReturn = require("../functions/userStateReturn");
const auth = require("../middleware/auth");

const router = express.Router();

const getItemsDataIndexOfItemName = (itemName) => {
	return itemsSpecs.findIndex((element) => element.name === itemName);
};

let saveSTATUS = {
	save: true,
	status: "",
};

router.post("/", auth, (req, res) => {
	UserModel.findById(req.decoded, (error, result) => {
		const reqParsedItem =
			itemsSpecs[getItemsDataIndexOfItemName(req.body.itemName)];

		////////////// BUY
		if (req.body.action === "BUY") {
			if (result.credits >= reqParsedItem.price * req.body.changeItemAmount) {
				result.credits -= reqParsedItem.price * req.body.changeItemAmount;
				// search if user already has item
				let found = false;
				result.items.forEach((item, index) => {
					if (item.id === reqParsedItem.id) {
						(result.items[index].amount += req.body.changeItemAmount),
							(found = true);
					}
				});
				!found &&
					result.items.push({
						id: reqParsedItem.id,
						amount: req.body.changeItemAmount,
					});
				saveSTATUS.save = true;
				saveSTATUS.status = "TRANSACTION COMPLETED";
			} else {
				saveSTATUS.save = false;
				saveSTATUS.status = "BAD REQUEST";
			}
		}

		///////////// SELL
		if (req.body.action === "SELL") {
			// search if user already has item
			let found = false;
			result.items.forEach((item, index) => {
				if (item.id === reqParsedItem.id) {
					// check if at least one item will be left after
					found = true;
					if (result.items[index].amount > req.body.changeItemAmount) {
						result.credits += reqParsedItem.price * req.body.changeItemAmount;
						result.items[index].amount -= req.body.changeItemAmount;
					} else {
						result.credits += reqParsedItem.price;
						result.items.splice([index], 1);
					}
					saveSTATUS.save = true;
					saveSTATUS.status = "TRANSACTION COMPLETED";
				}
			});
			if (!found) {
				saveSTATUS.save = false;
				saveSTATUS.status = "BAD REQUEST";
			}
		}
		////////////// UPDATE TO DB
		if (saveSTATUS.save === true) {
			result.save((errSave, resSave) => {
				errSave &&
					(res.status(400).json({ status: "ERROR OCCURRED", err: errSave }),
					console.log(errSave));
				resSave &&
					res.status(200).json(userStateReturn(result, saveSTATUS.status));
				// console.log(resSave));
			});
		} else res.status(200).json(userStateReturn(result, saveSTATUS.status));

		error &&
			(res.status(400).json({ status: "ERROR OCCURRED", err: error }),
			console.log(error));
	});
});

module.exports = router;
