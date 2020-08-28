import React from "react";
import "./css/App.css";
import { useHistory, useLocation } from "react-router-dom";

import myContext from "../context/account/myContext";
import socialContext from "../context/social/socialContext";

import Container from "./container/Container";
import NotificationsContentBlock from "./social/NotificationsContentBlock";

import NtfNews from "./social/notifications/NtfNews";
import NtfPanel from "./social/notifications/NtfPanel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faUsers,
	faCog,
	faRunning,
} from "@fortawesome/free-solid-svg-icons";

import useTimer from "../hooks/useTimer";

function App(props) {
	// override landings page body overflow hidden
	document.querySelector("body").style.overflow = "auto";

	const context = React.useContext(myContext);
	const contextSocial = React.useContext(socialContext);

	const history = useHistory();
	let location = useLocation();

	React.useEffect(() => {
		document.title = "Simas Zurauskas | App";
		window.scrollTo(0, 0);
	}, []);

	// useTimer(true, 3, (periods) => console.log("callback", periods));

	return (
		context.accountState.logged && (
			<React.Fragment>
				<div className='main'>
					<div className='top-bar'>
						<div className='top-bar-shader'>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
							<div className='box'></div>
						</div>

						<div className='mask'></div>
						<div className='top-bar-content'>
							<div>
								<h1 className='h1-main'>
									{`Welcome back, ${context.accountState.user} `}
								</h1>
								<h1 className='h1-second'>
									{`Welcome back, ${context.accountState.user} `}
								</h1>
							</div>

							<FontAwesomeIcon
								className='exit-icon'
								onClick={() => history.push("/")}
								icon={faRunning}
								style={{ fontSize: "30px" }}
							/>
							<div className='nav-links'>
								<div
									className='nav-links-box'
									onClick={() => history.push("/app")}>
									<FontAwesomeIcon
										className={`nav-links-icon ${
											location.pathname === "/app"
												? "nav-links-icon-path"
												: "nav-links-icon-hover"
										}`}
										icon={faHome}
									/>
									{/* <span>Home</span> */}
								</div>

								<div
									className='nav-links-box'
									onClick={() => history.push("/app/users")}>
									<FontAwesomeIcon
										className={`nav-links-icon ${
											location.pathname === "/app/users"
												? "nav-links-icon-path"
												: "nav-links-icon-hover"
										}`}
										icon={faUsers}
									/>
									{/* <span>Users</span> */}
								</div>

								<div
									className='nav-links-box'
									onClick={() => history.push("/app/account")}>
									<FontAwesomeIcon
										className={`nav-links-icon ${
											location.pathname === "/app/account"
												? "nav-links-icon-path"
												: "nav-links-icon-hover"
										}`}
										icon={faCog}
									/>
									{/* <span>Account</span> */}
								</div>
							</div>
						</div>
					</div>
					<div className='App'>
						<NtfNews />
						{contextSocial.isNotificationOpen && <NtfPanel />}
						{/* {contextSocial.isNotificationOpen && <NotificationsContentBlock />} */}

						<Container {...props} />
					</div>
				</div>
			</React.Fragment>
		)
	);
}

export default App;
