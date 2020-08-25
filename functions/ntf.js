const UserModel = require("../schemas/userSchema");
const NotificationsList = require("../schemas/notificationsMODEL");
const profileImgSmall = require("../schemas/profileImgSmall");

const ntf = (receiver, format, link, text1, link2) => {
	console.log(`NTF: ${receiver}, ${format}, ${link}, ${text1}, ${link2}`);
	UserModel.findOne({ userName_tlc: receiver.toLowerCase() }).then(
		(resultat) => {
			if (receiver !== link) {
				if (format === "POST_COMMENT") {
					console.log("POST_COMMENT");
					// GRAB DATA FROM A SENDER
					UserModel.findOne({ userName: link }).then((link) => {
						// ADD NOTIFICATION TO RECEIVERS NOTIFICATIONS LIST
						NotificationsList.findById(resultat.notifications._id).then(
							(result) => {
								// console.log(link);
								result.list.unshift({
									messageBody: {
										format: format,
										link: link.userName,
										text1: text1,
										link2: link2,
									},
									img: link.imgsmall,
								});
								result.save();
							}
						);
					});
				}
				if (format === "POST_LIKE") {
					console.log("POST_LIKE");
					// GRAB DATA FROM A SENDER
					UserModel.findOne({ userName: link }).then((link) => {
						// ADD NOTIFICATION TO RECEIVERS NOTIFICATIONS LIST
						NotificationsList.findById(resultat.notifications._id).then(
							(result) => {
								// console.log(link);
								result.list.unshift({
									messageBody: {
										format: format,
										link: link.userName,
										text1: text1,
										link2: link2,
									},
									img: link.imgsmall,
								});
								result.save();
							}
						);
					});
				}
				// console.log(resultat);
				if (format === "USERLINK_TEXT") {
					// GRAB DATA FROM A SENDER
					UserModel.findOne({ userName: link }).then((link) => {
						// ADD NOTIFICATION TO RECEIVERS NOTIFICATIONS LIST
						NotificationsList.findById(resultat.notifications._id).then(
							(result) => {
								// console.log(link);

								result.list.unshift({
									messageBody: {
										format: format,
										link: link.userName,
										text1: text1,
									},

									img: link.imgsmall,
								});
								result.save();
							}
						);
					});
				}
				if (format === "SIMPLE_TEXT") {
					// const defaultImage = fs.readFileSync(
					// 	path.join(`${__dirname + "/../"}/img/notification.png`)5f251fa75128780514d58a0e
					// );
					NotificationsList.findById(resultat.notifications._id).then(
						async (result) => {
							await profileImgSmall
								.findOne({ use: "SIMPLE_TEXT" })
								.then((img) => {
									// console.log(img);

									result.list.unshift({
										messageBody: {
											format: format,
											link: "",
											text1: text1,
										},
										img: img,
									});
									result.save();
								});
						}
					);
				}
			}
		}
	);
};

module.exports = ntf;
