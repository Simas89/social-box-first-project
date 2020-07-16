const getConvertedItemsData = (id) => {
	const index = itemsSpecs.findIndex((element) => element.id === id);
	return {
		itemName: itemsSpecs[index].name,
		id: itemsSpecs[index].id,
		price: itemsSpecs[index].price,
	};
};

module.exports = getConvertedItemsData;
