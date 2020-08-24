import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter, Route } from "react-router-dom";
import ContextState from "./context/account/ContextState";
import SocialState from "./context/social/SocialState";
import LandingState from "./context/landing/LandingState";
import PostState from ".//context/post/PostState";
// import Landing from "./Landing";
import LandingMain from "./components/landing/LandingMain";

ReactDOM.render(
	// <React.StrictMode>
	<React.Fragment>
		<link
			rel='stylesheet'
			href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
		/>
		<BrowserRouter>
			<ContextState>
				<SocialState>
					<LandingState>
						<PostState>
							<Route exact path='/' component={LandingMain} />
							<Route path='/app' component={App} />
						</PostState>
					</LandingState>
				</SocialState>
			</ContextState>
		</BrowserRouter>
	</React.Fragment>,

	document.getElementById("root")
);
