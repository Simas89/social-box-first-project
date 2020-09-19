const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const UserModel = require("../schemas/userSchema");
const ContactsList = require("../schemas/contactsListMODEL");
const Notifications = require("../schemas/notificationsMODEL");
const ProfileImgSmall = require("../schemas/profileImgSmall");
const ProfileImgMicro = require("../schemas/profileImgMicro");
const ProfileImgBig = require("../schemas/profileImgBig");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.post("/", (req, res) => {
	if (req.body.userName.length < 3 || req.body.userPsw.length < 3) {
		res.status(400).json({
			status: "User Name and Password must be at least 3 characters long.",
		});
	} else {
		UserModel.exists(
			{ userName_tlc: req.body.userName.toLowerCase() },
			async (error, result) => {
				if (!result) {
					const defaultImage = fs.readFileSync(
						path.join(`${__dirname + "/../"}/img/default.png`)
					);
					const defaultImageMini = fs.readFileSync(
						path.join(`${__dirname + "/../"}/img/defaultmini.png`)
					);
					const defaultImageMicro = fs.readFileSync(
						path.join(`${__dirname + "/../"}/img/defaultmicro.png`)
					);

					const newProfileImgMicro = new ProfileImgMicro({
						data: defaultImageMicro,
						contentType: "image/png",
					});

					const newProfileImgSmall = new ProfileImgSmall({
						data: defaultImageMini,
						contentType: "image/png",
					});

					const newProfileImgBig = new ProfileImgBig({
						data: defaultImage,
						contentType: "image/png",
					});

					const newContact = new ContactsList({
						list: [{ userName: "Simas" }],
					});
					const newNotifications = new Notifications({
						list: [],
					});

					await newContact.save();
					await newNotifications.save();
					await newProfileImgMicro.save();
					await newProfileImgSmall.save();
					await newProfileImgBig.save();

					const user = new UserModel({
						userName: req.body.userName,
						userName_tlc: req.body.userName.toLowerCase(),
						userPsw: bcrypt.hashSync(req.body.userPsw, bcrypt.genSaltSync(10)),
						credits: 1000,
						dateJoined: Date.now(),
						email: "",
						verified: false,
						items: [],
						contacts: newContact,
						notifications: newNotifications,
						imgmicro: newProfileImgMicro,
						imgsmall: newProfileImgSmall,
						imgbig: newProfileImgBig,
					});

					user.save((err) =>
						err
							? (console.log("Error: " + err),
							  res
									.status(400)
									.json({ status: "FAILED TO REGISTER", err: err }))
							: res.status(200).json({ status: "USER REGISTERED" })
					);
				} else {
					res.status(200).json({ status: "USER ALREADY EXISTS" });
				}
				if (error) {
					res.status(400).json({ status: "ERROR OCCURRED", err: error });
					console.log("Error: " + error);
				}
			}
		);
	}
});

module.exports = router;
