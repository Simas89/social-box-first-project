const UserModel = require("../schemas/userSchema");
const NotificationsList = require("../schemas/notificationsMODEL");
const profileImgSmall = require("../schemas/profileImgSmall");

const ntf = (receiver, format, link, text1, link2) => {
	console.log(`NTF: ${receiver}, ${format}, ${link}, ${text1}, ${link2}`);
};

module.exports = ntf;
