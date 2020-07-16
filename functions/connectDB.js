const mongoose = require("mongoose");
const config = require("config");

const connectDB = () => {
	mongoose.connect(config.get("mongoURI"), {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", () => console.log("---Conected to DB!---"));
	mongoose.set("useFindAndModify", true); /// WTF
};

module.exports = connectDB;
