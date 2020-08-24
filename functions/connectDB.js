const mongoose = require("mongoose");

const connectDB = () => {
	mongoose.connect(
		"mongodb+srv://Simas:bartez89sims@clusterzero-ecbw8.mongodb.net/MyContainerProduction?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		}
	);
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", () => console.log("---Conected to DB!---"));
	mongoose.set("useFindAndModify", true); /// WTF
};

module.exports = connectDB;
