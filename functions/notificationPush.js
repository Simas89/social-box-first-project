const UserModel = require("../schemas/userSchema");
const NotificationsList = require("../schemas/notificationsMODEL");
const fs = require("fs");
const path = require("path");

module.exports = function (receiver, format, link, text1) {
	UserModel.findOne({ userName: receiver }).then((resultat) => {
		if (format === "USERLINK_TEXT") {
			// GRAB DATA FROM A SENDER
			UserModel.findOne({ userName: link }).then((link) => {
				// ADD NOTIFICATION TO RECEIVERS NOTIFICATIONS LIST
				NotificationsList.findById(resultat.notifications._id).then(
					(result) => {
						result.list.unshift({
							messageBody: {
								format: format,
								link: link.userName,
								text1: text1,
							},
							imgMini: {
								data: link.imgMini.data,
								contentType: link.imgMini.contentType,
							},
						});
						result.save();
					}
				);
			});
		}
		if (format === "SIMPLE_TEXT") {
			// const defaultImage = fs.readFileSync(
			// 	path.join(`${__dirname + "/../"}/img/notification.png`)
			// );
			NotificationsList.findById(resultat.notifications._id).then((result) => {
				result.list.unshift({
					messageBody: {
						format: format,
						link: "",
						text1: text1,
					},
					imgMini: {
						// insert default image here
						data: fs.readFileSync(
							path.join(`${__dirname + "/../"}/img/notification.png`)
						),
						contentType: "image/png",
					},
				});
				result.save();
			});
		}
	});
};
