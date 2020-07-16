const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const cors = require("cors");
// Import routes
const verification = require("./routes/verification");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const registerRoute = require("./routes/register");
const containerRoute = require("./routes/container");
const marketItemsDataRoute = require("./routes/market");
const findUsersRoute = require("./routes/findUsers");
const userProfileRoute = require("./routes/userprofile");
const sendPresentRoute = require("./routes/sendpresent");
const notificationsRoute = require("./routes/notifications");
const uploadRoute = require("./routes/uploadRoute");
//GraphQL
const schema = require("./graphql/schema");
const rootValue = require("./graphql/rootValue");
// Import functions
const connectDB = require("./functions/connectDB");
const loadItemsSpecs = require("./functions/loadItemsSpecs");
const onlineStatusUpdate = require("./middleware/onlineStatusUpdate");

////////  Initialize
connectDB();
itemsSpecs = loadItemsSpecs();

////////  Middleware
const app = express();
app.use(cors());
app.use(express.json({ extended: false })); //Body parser
app.use((req, res, next) => {
	onlineStatusUpdate(req.header("x-auth-token"));
	next();
});

//GraphQL
app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: rootValue,
		graphiql: true,
	})
);
//////// Routes
app.use("/verification", verification);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/register", registerRoute);
app.use("/container", containerRoute);
app.use("/market", marketItemsDataRoute);
app.use("/users", findUsersRoute);
app.use("/userprofile", userProfileRoute);
app.use("/sendpresent", sendPresentRoute);
app.use("/notifications", notificationsRoute);
app.use("/upload", uploadRoute);
//

// Run server
const PORT = process.env.PORT || 2000;
app.listen(2000, "0.0.0.0", () => console.log(`---PORT: ${PORT}---`));
