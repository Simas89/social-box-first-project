import React from "react";
import "./css/App.css";
import { Route, Link, useHistory } from "react-router-dom";

import myContext from "./context/account/myContext";
import socialContext from "./context/social/socialContext";

import Container from "./Container";
import Login from "./Login";
import Register from "./Register";
import NotificationsContentBlock from "./social/NotificationsContentBlock";
import NotificationTab from "./social/NotificationTab";

function App(props) {
	// override landings page body overflow hidden
	document.querySelector("body").style.overflow = "auto";
	const context = React.useContext(myContext);
	const contextSocial = React.useContext(socialContext);
	const history = useHistory();

	return (
		<React.Fragment>
			<div className='nav'>
				<div className='nav-content'>
					<h1
						onClick={() => {
							history.push("/");
						}}>
						My Container
					</h1>
					<ul>
						<li>
							<Link to='/about'>About</Link>
						</li>
					</ul>
					{context.accountState.logged && (
						<p>{`${context.accountState.user}   Cr: ${context.accountState.credits}`}</p>
					)}
					<div>
						{context.accountState.logged && (
							<button onClick={context.accountState.logOff}>Logout</button>
						)}
					</div>
				</div>
			</div>

			<div
				className='App'
				style={{
					position: "relative",
				}}>
				{context.accountState.logged && <NotificationTab />}
				{contextSocial.isNotificationOpen && context.accountState.logged && (
					<NotificationsContentBlock />
				)}

				{/* <Route /////////////// Container
					exact
					path='/container'
					render={() =>
						context.accountState.logged
							? history.push("/container")
							: history.push("/login")
					}
				/> */}
				<Route /* /////////// Container */
					path='/container'
					render={(props) => <Container {...props} />}
				/>
				<Route /* /////////// Login */
					exact
					path='/login'
					render={() => (
						<Login
							logged={context.accountState.logged}
							logIn={context.accountState.logIn}
						/>
					)}
				/>
				<Route /* /////////// Register */
					exact
					path='/register'
					render={() => <Register logIn={context.accountState.logIn} />}
				/>
			</div>
		</React.Fragment>
	);
}

export default App;
