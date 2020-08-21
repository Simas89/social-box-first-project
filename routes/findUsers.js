const express = require("express");
const auth = require("../middleware/auth");
const UserModel = require("../schemas/userSchema");
const ContactsList = require("../schemas/contactsListMODEL");
const notificationPUSH = require("../functions/notificationPUSH");
const calcIsOnline = require("../middleware/calcIsOnline");

const router = express.Router();

router.get("/", auth, (req, res) => {
	UserModel.findById(req.decoded, (error, result) => {
		ContactsList.findById(result.contacts, (errorTOP, resultTOP) => {
			// console.log(resultTOP.list);
			if (!JSON.parse(req.header("myContactsOnly"))) {
				//////////////////  GLOBAL SEARCH
				UserModel.find(
					{
						userName_tlc: {
							$regex: `${req.header("searchValue").toLowerCase()}`,
						},
					},
					(error, result) => {
						if (error) res.status(500).json({ status: "ERROR FINDING USERS" });
						const users = result
							.map((element) => {
								// console.log(element);
								// isListed checker
								let found = false;
								resultTOP.list.forEach((iii) => {
									if (iii.userName === element.userName) found = true;
								}); //
								return {
									id: element._id,
									userName: element.userName,
									verified: element.verified,
									isListed: found,
									isOnline: calcIsOnline(element.isOnline),
									imgMini: {
										data: element.imgsmall.data.toString("base64"),
										contentType: element.imgsmall.contentType,
									},
									settings: {
										showOnline: element.settings.showOnline,
									},
								};
							})
							.sort((a, b) => {
								if (a.userName > b.userName) {
									return 1;
								} else {
									return -1;
								}
							});
						res.status(200).json(users);
					}
				).populate("imgsmall");
			}
			if (JSON.parse(req.header("myContactsOnly"))) {
				//////////////////  LOCAL SEARCH
				const filtered = [];
				resultTOP.list.forEach((element) => {
					if (element.userName.includes(req.header("searchValue")))
						filtered.push(element.userName);
				});

				let users = [];
				Promise.all(
					filtered.map((element) =>
						UserModel.findOne({ userName_tlc: element.toLowerCase() })
							.populate("imgsmall")
							.then((result) => {
								// console.log(object)
								// console.log(result);
								if (result) {
									users.push({
										id: result._id,
										userName: result.userName,
										verified: result.verified,
										isListed: true,
										///// ????????????
										isOnline: calcIsOnline(result.isOnline),
										imgMini: {
											data: result.imgsmall.data.toString("base64"),
											contentType: result.imgsmall.contentType,
										},
										settings: {
											showOnline: result.settings.showOnline,
										},
									});
								} else {
									// find and remove nit valid user from list
									resultTOP.list.splice(
										resultTOP.list.findIndex((iii) => iii.userName === element),
										1
									);
									resultTOP.save();
								}
							})
					)
				)
					.then(() => {
						users.sort((a, b) => {
							if (
								a.userName.toLocaleLowerCase() > b.userName.toLocaleLowerCase()
							) {
								return 1;
							} else {
								return -1;
							}
						});
						res.status(200).json(users);
					})
					.catch(() => res.status(500).json([]));
			}
		}).catch((err) =>
			res.status(500).json({ status: "SERVER ERROR", err: err })
		);
	}).catch((err) => res.status(500).json({ status: "SERVER ERROR", err: err }));
});

router.get("/addremove", auth, (req, res) => {
	UserModel.findById(req.decoded, (error, result) => {
		ContactsList.findById(result.contacts)
			.then(async (data) => {
				if (!JSON.parse(req.header("isListed"))) {
					///////////////////// ADDING NEW CONTACT
					let found = false;
					data.list.forEach((element) => {
						element.userName === req.header("userName") && (found = true);
					});
					if (!found) {
						///////////////////  NOTIFICATION PUSH
						notificationPUSH(
							req.header("userName"),
							"USERLINK_TEXT",
							result.userName,
							`has added you to contacts`
						);
						data.list.push({
							userName: req.header("userName"),
						}),
							await data
								.save()
								.then(res.status(200).json({ status: "CONTACT ADDED" }));
					} else res.status(200).json({ status: "CONTACT ALREDY LISTED" });
				} else {
					///////////// REMOVING A CONTACT
					data.list.splice(
						data.list.findIndex(
							(iii) => iii.userName === req.header("userName")
						),
						1
					);
					data
						.save()
						.then(res.status(200).json({ status: "CONTACT REMOVED" }))
						.catch((err) =>
							res.status(500).json({ status: "SERVER ERROR", err: err })
						);
				}
			})
			.catch((err) =>
				res.status(500).json({ status: "SERVER ERROR", err: err })
			);
	})
		.populate("contacts")
		.catch((err) => res.status(500).json({ status: "SERVER ERROR", err: err }));
});

module.exports = router;
