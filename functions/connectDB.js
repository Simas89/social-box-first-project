const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
	mongoose.connect(
		`mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PSW}@clusterzero-ecbw8.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		}
	);

	const db = mongoose.connection;

	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", () => {
		console.log("---Conected to DB!---");

		db.collection("comments")
			.watch()
			.on("change", (data) => " console.log(data.documentKey)");
	});
	mongoose.set("useFindAndModify", true); /// WTF
};

module.exports = connectDB;
