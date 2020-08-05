const getConvertedItemsData = require("./getConvertedItemsData");

const userStateReturn = (result, status, token, rememberMe) => {
	let build = result.items.map((element) => {
		const convertedItem = getConvertedItemsData(element.id);
		Object.assign(convertedItem, {
			amount: element.amount,
		});
		return convertedItem;
	});
	return {
		userName: result.userName,
		credits: result.credits,
		items: build,
		email: result.email,
		verified: result.verified,
		dateJoined: result.dateJoined.toDateString(),
		status: status,
		token,
		rememberMe,
		imgbig: {
			base64: result.imgbig.data.toString("base64"),
			mimetype: result.imgbig.contentType,
		},
	};
};

module.exports = userStateReturn;
