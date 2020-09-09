import express from "express";
import path from "path";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "graphql-tools";
import socketIO from "socket.io";
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
const onlineStatusUpdate = require("./middleware/onlineStatusUpdate");

////////  Initialize
connectDB();
///////    ESPRESS STUFF
const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
app.use((req, res, next) => {
	onlineStatusUpdate(req.header("x-auth-token"));
	next();
});
//REST routes
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
app.get("/socket", (req, res) => {
	res.send({ response: "Server is up and running." }).status(200);
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

///////   GraphQL
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

//////   Apollo
const apolloServer = new ApolloServer({
	schema: schema,
	// context: { io },
});
apolloServer.applyMiddleware({ app });
const server = createServer(app);

// Run server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
	console.log(`--- Express A.sub PORT: ${PORT} ---`);
	new SubscriptionServer(
		{
			execute,
			subscribe,
			schema,
		},
		{
			server: server,
			// path: "/subscriptions",
		}
	);
});

const socket = socketIO(server);
socket.on("connection", (socket) => {
	console.log("A client connected", socket.id);
	// Just to current socket user
	socket.emit("message", `Hello World! ${socket.id}`);
	socket.broadcast.emit("message", "hi all, but not me");
	socket.on("chat", (data) => {
		console.log(data);
		socket.emit("reply", data);
	});
});
