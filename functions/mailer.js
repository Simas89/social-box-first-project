var nodemailer = require("nodemailer");

module.exports = function (email, subject, text, callback) {
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "simasdevelopment@gmail.com",
			pass: "bartez89simsdev",
		},
	});

	var mailOptions = {
		from: "simasdevelopment@gmail.com",
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
