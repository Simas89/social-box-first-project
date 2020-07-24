import React from "react";
import "./css/App.css";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import myContext from "./context/account/myContext";
import socialContext from "./context/social/socialContext";

import Container from "./Container";
import NotificationsContentBlock from "./social/NotificationsContentBlock";
import NotificationTab from "./social/NotificationTab";

function App(props) {
	// override landings page body overflow hidden
	document.querySelector("body").style.overflow = "auto";
	const context = React.useContext(myContext);
	const contextSocial = React.useContext(socialContext);
	const history = useHistory();

	return (
		context.accountState.logged && (
			<React.Fragment>
				<div className='nav'>
					<div className='nav-content'>
						<Icon
							style={{ cursor: "pointer" }}
							onClick={() => {
								history.push("/container");
							}}
							name='home'
							size='large'
						/>
						<Icon
							style={{ cursor: "pointer" }}
							onClick={() => {
								history.push("/");
							}}
							name='sign out'
							size='large'
						/>

						{context.accountState.logged && (
							<p>{`${context.accountState.user}   Cr: ${context.accountState.credits}`}</p>
						)}
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
					<Container {...props} />
				</div>
			</React.Fragment>
		)
	);
}

export default App;
