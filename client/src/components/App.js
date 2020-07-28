import React from "react";
import "./css/App.css";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import MiniConsole from "./other/MiniConsole";

import myContext from "../context/account/myContext";
import socialContext from "../context/social/socialContext";

import Container from "./container/Container";
import NotificationsContentBlock from "./social/NotificationsContentBlock";
import NotificationTab from "./social/NotificationTab";

function App(props) {
	// override landings page body overflow hidden
	document.querySelector("body").style.overflow = "auto";

	const context = React.useContext(myContext);
	const contextSocial = React.useContext(socialContext);

	const history = useHistory();

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		context.accountState.logged && (
			<React.Fragment>
				<div className='main'>
					<div className='top-bar'>
						<div className='top-bar-content'>
							<h1>
								{" "}
								{`Welcome back, ${context.accountState.user} `}
								<MiniConsole />
							</h1>
							<Icon
								className='exit-icon'
								onClick={() => history.push("/")}
								name='sign out'
								size='large'
							/>
							<div className='nav-links'>
								<div className='fill-1'>
									<Icon
										className='nav-icon'
										onClick={() => history.push("/container")}
										name='home'
										size='large'
									/>
								</div>
								<div className='fill-2'>
									<div onClick={() => history.push("/container/items")}>
										<Icon
											className='iconas'
											onClick={() => history.push("/")}
											name='warehouse'
											size='large'
										/>
										<p>Items</p>
									</div>
									<div onClick={() => history.push("/container/market")}>
										<Icon
											className='iconas'
											onClick={() => history.push("/")}
											name='money'
											size='large'
										/>
										<p>Market</p>
									</div>
									<div onClick={() => history.push("/container/users")}>
										<Icon
											className='iconas'
											onClick={() => history.push("/")}
											name='users'
											size='large'
										/>
										<p>Users</p>
									</div>
									<div onClick={() => history.push("/container/account")}>
										<Icon
											className='iconas'
											onClick={() => history.push("/")}
											name='setting'
											size='large'
										/>
										<p>Account</p>
									</div>
								</div>
								<div className='fill-1'></div>
							</div>
						</div>
					</div>
					<div className='App'>
						<NotificationTab />
						{contextSocial.isNotificationOpen && <NotificationsContentBlock />}
						<div className='message-notification'>
							<Icon
								className='message-notification-icon'
								name='mail'
								size='large'
							/>
						</div>

						<Container {...props} />
					</div>
				</div>
			</React.Fragment>
		)
	);
}

export default App;
