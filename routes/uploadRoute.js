const express = require("express");
const fileUpload = require("express-fileupload");
const UserModel = require("../schemas/userSchema");
const profileImgMicro = require("../schemas/profileImgMicro");
const profileImgSmall = require("../schemas/profileImgSmall");
const profileImgBig = require("../schemas/profileImgBig");

const sharp = require("sharp");

const router = express.Router();

router.post("/", fileUpload(), async (req, res) => {
	// console.log(req.files.myFile);
	console.log("LOL");
	// CONVERTING IMAGE
	let buffer = "";
	let bufferMini = "";
	let bufferMicro = "";
	try {
		await sharp(req.files.myFile.data)
			.rotate()
			.resize(700)
			.toBuffer()
			.then((data) => {
				buffer = data;
				// console.log(data);
			});
	} catch (error) {
		console.log(error);
	}
	try {
		await sharp(req.files.myFile.data)
			.rotate()
			.resize(250)
			.toBuffer()
			.then((data) => {
				bufferMini = data;
				// console.log(data);
			});
	} catch (error) {
		// console.log(error);
	}
	try {
		await sharp(req.files.myFile.data)
			.rotate()
			.resize(50)
			.toBuffer()
			.then((data) => {
				bufferMicro = data;
				// console.log(data);
			});
	} catch (error) {
		// console.log(error);
	}

	UserModel.findOne({ userName: req.header("user") }).then(async (result) => {
		// console.log(buffer);
		///// SAVING TO DB
		if (buffer) {
			await profileImgMicro
				.findByIdAndUpdate(result.imgmicro._id.toString())
				.then((imgmicro) => {
					// console.log(imgmicro);
					imgmicro.data = bufferMicro;
					imgmicro.contentType = req.files.myFile.mimetype;
					imgmicro.save();
				});

			await profileImgSmall
				.findByIdAndUpdate(result.imgsmall._id.toString())
				.then((imgsmall) => {
					// console.log(imgsmall);
					imgsmall.data = bufferMini;
					imgsmall.contentType = req.files.myFile.mimetype;
					imgsmall.save();
				});

			await profileImgBig
				.findByIdAndUpdate(result.imgbig._id.toString())
				.then((imgbig) => {
					// console.log(imgbig);
					imgbig.data = buffer;
					imgbig.contentType = req.files.myFile.mimetype;
					imgbig.save();
				});
			res
				.json({
					base64: buffer.toString("base64"),
					mimetype: req.files.myFile.mimetype,
				})
				.status(200);
		} else {
			res.status(400).json({ status: "COULD NOT PROCESS IMAGE" });
		}
	});
});

module.exports = router;
