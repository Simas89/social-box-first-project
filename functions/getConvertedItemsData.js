const loadItemsSpecs = require("./loadItemsSpecs");

const getConvertedItemsData = (id) => {
	const itemsSpecs = loadItemsSpecs();
	const index = itemsSpecs.findIndex((element) => element.id === id);
	return {
		itemName: itemsSpecs[index].name,
		id: itemsSpecs[index].id,
		price: itemsSpecs[index].price,
	};
	// return {
	// 	itemName: "Horse",
	// 	id: 5,
	// 	price: 200,
	// };
};

module.exports = getConvertedItemsData;
