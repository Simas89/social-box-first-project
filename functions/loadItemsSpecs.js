const fs = require("fs");

module.exports = function () {
	const itemsSpecs = JSON.parse(fs.readFileSync("itemsData.json", "utf-8"));
	return itemsSpecs;
};
