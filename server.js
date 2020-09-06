const express = require("express");
const path = require("path");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

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
const delAccRoute = require("./routes/delete");
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

///////////  GraphQL
// Put together a schema
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});
// The GraphQL endpoint
app.use("/graphql", graphqlExpress({ schema, context: { pubsub } }));
// app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

//////// REST Routes
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
app.use("/delete", delAccRoute);
//

// Serve static assets in production

if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

// Run server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`---PORT: ${PORT}---`));
