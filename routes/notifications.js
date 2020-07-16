const express = require("express");
const UserModel = require("../schemas/userSchema");
const NotificationsList = require("../schemas/notificationsMODEL");
const notificationPUSH = require("../functions/notificationPUSH");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/push", (req, res) => {
	notificationPUSH(
		"Simas",
		"SIMPLE_TEXT",
		undefined,
		`Simple text notification`
	);
	res.status(200).json("200");
});

router.get("/pull", auth, (req, res) => {
	UserModel.findOne({ userName: req.header("user") }, async (err, result) => {
		const page = parseInt(req.header("pagination"));
		result
			? await NotificationsList.findById(result.notifications._id).then(
					(resultat) => {
						// console.log("TEST:", resultat);
						// Check how many notificatios isSeen in whole list
						let newNotifications = 0;
						const notfsPerPage = 5;
						const countIsSeen = () => {
							resultat.list.forEach((item) => {
								item.isSeen === false && newNotifications++;
							});
						};
						// CONVERTS IMAGE OF NOTIFICATION OBJECT FROM BIN TO BASE64
						const converter = (object) => {
							const copy = {
								messageBody: object.messageBody,
								imgMini: {
									data: object.imgMini.data.toString("base64"),
									mimetype: object.imgMini.contentType,
								},
								isSeen: object.isSeen,
								timestamp: object.timestamp,
								_id: object._id,
							};
							return copy;
						};
						//////////

						if (req.header("action") === "REFRESH") {
							countIsSeen();
							res.status(200).json({
								list: resultat.list
									.slice((page - 1) * notfsPerPage, page * notfsPerPage)
									.map((element) => converter(element)),
								length:
									Math.floor((resultat.list.length - 1) / notfsPerPage) + 1,
								read: resultat.list.length - newNotifications,
								unRead: newNotifications,
							});
						}
						if (req.header("action") === "DELETE_ONE") {
							resultat.list.splice(
								resultat.list.findIndex(
									(item) => item._id.toString() === req.header("id")
								),
								1
							);
							resultat.save();
							countIsSeen();
							res.status(200).json({
								list: resultat.list
									.slice((page - 1) * notfsPerPage, page * notfsPerPage)
									.map((element) => converter(element)),
								length:
									Math.floor((resultat.list.length - 1) / notfsPerPage) + 1,
								read: resultat.list.length - newNotifications,
								unRead: newNotifications,
							});
						}
						if (req.header("action") === "DELETE_ALL") {
							resultat.list = [];
							resultat.save();
							countIsSeen();
							res.status(200).json({
								list: resultat.list
									.slice((page - 1) * notfsPerPage, page * notfsPerPage)
									.map((element) => converter(element)),
								length:
									Math.floor((resultat.list.length - 1) / notfsPerPage) + 1,
								read: resultat.list.length - newNotifications,
								unRead: newNotifications,
							});
						}
						if (req.header("action") === "SEEN_ONE") {
							resultat.list[
								resultat.list.findIndex(
									(item) => item._id.toString() === req.header("id")
								)
							].isSeen = true;

							resultat.save();
							countIsSeen();
							res.status(200).json({
								list: resultat.list
									.slice((page - 1) * notfsPerPage, page * notfsPerPage)
									.map((element) => converter(element)),
								length:
									Math.floor((resultat.list.length - 1) / notfsPerPage) + 1,
								read: resultat.list.length - newNotifications,
								unRead: newNotifications,
							});
						}
						if (req.header("action") === "SEEN_ALL") {
							resultat.list.forEach((item) => (item.isSeen = true));

							resultat.save();
							countIsSeen();
							res.status(200).json({
								list: resultat.list
									.slice((page - 1) * notfsPerPage, page * notfsPerPage)
									.map((element) => converter(element)),
								length:
									Math.floor((resultat.list.length - 1) / notfsPerPage) + 1,
								read: resultat.list.length - newNotifications, /////////////////////////////////////////
								unRead: newNotifications,
							});
						}
					}
			  )
			: res.status(204).json([]);
	});
});

module.exports = router;
