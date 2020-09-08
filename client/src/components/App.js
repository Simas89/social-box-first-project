import React from "react";
import "./css/App.css";
import { useHistory, useLocation } from "react-router-dom";

import myContext from "../context/account/myContext";
import socialContext from "../context/social/socialContext";
import postContext from "../context/post/postContext";
import chatContext from "../context/chat/chatContext";

import Container from "./container/Container";
// import NotificationsContentBlock from "./social/NotificationsContentBlock";

import MsgIcon from "./social/notifications/MsgIcon";

import NtfNews from "./social/notifications/NtfNews";
import NtfPanel from "./social/notifications/NtfPanel";
import Wave from "../components/other/Wave";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faUsers,
	faCog,
	faRunning,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import useTimer from "../hooks/useTimer";

import Chat from "./social/chat/Chat";
import io from "socket.io-client";
const socket = io();
socket.on("reply", (msg) => console.log(msg));

function App(props) {
	// override landings page body overflow hidden
	document.querySelector("body").style.overflow = "auto";

	const context = React.useContext(myContext);
	const contextSocial = React.useContext(socialContext);
	const contextPost = React.useContext(postContext);
	const contextChat = React.useContext(chatContext);
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
	const [greeting, setGreeting] = React.useState("");
	// console.log(contextChat);

	const history = useHistory();
	let location = useLocation();
	const resizeEvent = () => {
		setWindowWidth(window.innerWidth);
		// console.log("resizeEvent");
	};

	React.useEffect(() => {
		document.title = "Simas Zurauskas | App";
		// window.scrollTo(0, 0);
		window.addEventListener("resize", resizeEvent);

		return () => {
			window.removeEventListener("resize", resizeEvent);
		};
	}, []);

	React.useEffect(
		() =>
			setGreeting(() => {
				const hour = new Date().getHours();
				// console.log("check", hour);

				switch (hour) {
					case 1:
						return `Staying late? ${context.accountState.user}`;
					case 2:
						return `Staying late? ${context.accountState.user}`;
					case 3:
						return `Staying late? ${context.accountState.user}`;
					case 4:
						return `Staying late?, ${context.accountState.user}`;
					case 5:
						return `Good Morning, ${context.accountState.user}`;
					case 6:
						return `Good Morning, ${context.accountState.user}`;
					case 7:
						return `Good Morning, ${context.accountState.user}`;
					case 8:
						return `Good Morning, ${context.accountState.user}`;
					case 9:
						return `Good Morning, ${context.accountState.user}`;
					case 10:
						return `Good Morning, ${context.accountState.user}`;
					case 11:
						return `Good Morning, ${context.accountState.user}`;
					case 12:
						return `Good Afternoon, ${context.accountState.user}`;
					case 13:
						return `Good Afternoon, ${context.accountState.user}`;
					case 14:
						return `Good Afternoon, ${context.accountState.user}`;
					case 15:
						return `Good Afternoon, ${context.accountState.user}`;
					case 16:
						return `Good Afternoon, ${context.accountState.user}`;
					case 17:
						return `Good Afternoon, ${context.accountState.user}`;
					case 18:
						return `Good Evening, ${context.accountState.user}`;
					case 19:
						return `Good Evening, ${context.accountState.user}`;
					case 20:
						return `Good Evening, ${context.accountState.user}`;
					case 21:
						return `Good Evening, ${context.accountState.user}`;
					case 22:
						return `Good Evening, ${context.accountState.user}`;
					case 23:
						return `Staying late? ${context.accountState.user}`;
					case 24:
						return `Staying late? ${context.accountState.user}`;

					default:
						return `Welcome back, ${context.accountState.user}`;
				}
			}),
		[context]
	);
	const parseLines = (num) => {
		let arr = [];
		for (let i = 0; i < num; i++) {
			arr.push(<div className={`box  col-${i}`} key={i}></div>);
		}
		return arr;
	};
	const randomNum = (num) => {
		const rand = Math.floor(Math.random() * (num - 0 + 1)) + 0;
		return rand;
	};

	const addClassShine = (num) => {
		const target = document.querySelector(`.col-${randomNum(num)}`);
		// target.classList.add("shine");
		try {
			target.style.opacity = 0.8;
			// console.log(target);
			setTimeout(() => (target.style.opacity = 0.2), randomNum(15) * 1000);
		} catch (error) {
			// console.log(error);
		}
	};

	useTimer(1, 1, (ticks) => {
		if (ticks === 60) {
			contextSocial.notificationsPull({ action: "REFRESH" });
		}
		randomNum(5) === 1 && addClassShine(parseInt(windowWidth / 40));
	});

	return (
		context.accountState.logged && (
			<React.Fragment>
				<div className='chat-fixed-frame'>
					<div
						className='chat-app-frame'
						style={{
							maxWidth: `${
								contextChat.state.targets.length > 1 ? "100%" : "1524px"
							}`,
						}}>
						{contextChat.state.targets.map((target, index) => {
							return (
								<Chat key={target.name} index={index} userName={target.name} />
							);
						})}
					</div>
				</div>

				<div className='main'>
					<div className='top-bar'>
						<div className='top-bar-shader'>
							{parseLines(parseInt(windowWidth / 40))}
						</div>

						<div className='mask'></div>
						<div className='top-bar-content'>
							<div>
								<h1 className='h1-main'>{greeting}</h1>
								<h1 className='h1-second'>{greeting}</h1>
							</div>
							<div
								className='exit'
								onClick={() => {
									history.push("/");
								}}>
								<FontAwesomeIcon
									className='exit-icon'
									icon={faRunning}
									style={{ fontSize: "25px" }}
								/>
								<FontAwesomeIcon
									className='exit-icon'
									icon={faArrowRight}
									style={{ fontSize: "17px" }}
								/>
							</div>
							<div className='nav-links'>
								<div
									className='nav-links-box'
									onClick={() => {
										if (
											location.pathname.includes("app/post/") ||
											location.pathname.includes("app/users/")
										) {
											contextPost.resetPosts();
										}
										history.push("/app");
									}}>
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
					<Wave />
					{/* <Wave2 /> */}

					<div className='App'>
						<NtfNews />
						<MsgIcon />
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
