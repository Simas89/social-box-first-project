import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter, Route } from "react-router-dom";
import ContextState from "./context/account/ContextState";
import SocialState from "./context/social/SocialState";
import LandingState from "./context/landing/LandingState";
import PostState from "./context/post/PostState";
import ChatState from "./context/chat/ChatState";
// import Landing from "./Landing";
import LandingMain from "./components/landing/LandingMain";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
	uri: process.env.REACT_APP_SOCKET_URI, //`wss://www.simaszurauskas.dev/graphql``ws://localhost:8080/graphql`
	options: {
		reconnect: true,
	},
});
const client = new ApolloClient({
	link,
	uri: "/graphql",
	cache: new InMemoryCache(),
});

ReactDOM.render(
	// <React.StrictMode>
	<React.Fragment>
		<link
			rel='stylesheet'
			href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
		/>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<ContextState>
					<ChatState apollo={client}>
						<SocialState>
							<LandingState>
								<PostState>
									<Route exact path='/' component={LandingMain} />
									<Route path='/app' component={App} />
								</PostState>
							</LandingState>
						</SocialState>
					</ChatState>
				</ContextState>
			</BrowserRouter>
		</ApolloProvider>
	</React.Fragment>,

	document.getElementById("root")
);
