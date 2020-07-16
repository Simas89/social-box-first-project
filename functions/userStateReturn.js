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
		profilePic: {
			base64: result.img.data.toString("base64"),
			mimetype: result.img.contentType,
		},
		//result.img.data.toString("base64")
	};
};

module.exports = userStateReturn;
