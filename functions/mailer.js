var nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = function (email, subject, text, callback) {
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PSW,
		},
	});

	var mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject,
		text,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			callback("Error sending email");
		} else {
			console.log("Email sent: " + info.response);
			callback("OK");
		}
	});
};
