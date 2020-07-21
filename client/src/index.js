import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter, Route } from "react-router-dom";
import ContextState from "./components/context/account/ContextState";
import SocialState from "./components/context/social/SocialState";
import LandingState from "./components/context/landing/LandingState";
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
						<Route exact path='/' component={LandingMain} />
					</LandingState>
					<Route path='/container' component={App} />
				</SocialState>
			</ContextState>
		</BrowserRouter>
	</React.Fragment>,

	document.getElementById("root")
);
