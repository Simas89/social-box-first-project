import React from "react";
// import { useHistory } from "react-router-dom";
import myContext from "../account/myContext";
import socialContext from "./socialContext";
import socialReducer from "./socialReducer";
import {
	NOTIFICATIONS_TAB_ON,
	NOTIFICATIONS_TAB_OFF,
	NOTIFICATIONS_UPDATE,
	NOTIFICATIONS_PAG_PAGE_SET,
} from "../types";

const SocialState = (props) => {
	const context = React.useContext(myContext);
	const initialState = {
		isNotificationOpen: false,
		notifications: [],
		notificationsLength: 0,
		notificationPaginationPage: 1,
		notificationRead: 0,
		notificationUnread: 0,
	};

	const [state, dispatch] = React.useReducer(socialReducer, initialState);

	const notificationBarOff = () =>
		dispatch({
			type: NOTIFICATIONS_TAB_OFF,
		});
	const notificationBarOn = () =>
		dispatch({
			type: NOTIFICATIONS_TAB_ON,
		});

	const notificationsPaginationSet = (page) =>
		dispatch({
			type: NOTIFICATIONS_PAG_PAGE_SET,
			payload: page,
		});

	const notPush = () => {
		fetch("http://localhost:2000/notifications/push", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": sessionStorage.getItem("token"),
			},
			body: JSON.stringify({
				message: "Hello World!",
				receiver: context.accountState.user,
			}),
		})
			.then((res) => res.json())
			.then((data) => {})
			.catch((err) => {
				console.log(err);
			});
	};
	const notificationsPull = (
		data,
		id = null,
		page = state.notificationPaginationPage,
		user = context.accountState.user
	) => {
		fetch("http://localhost:2000/notifications/pull", {
			method: "get",
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": sessionStorage.getItem("token"),
				user,
				action: data.action,
				pagination: page,
				id: id,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch({
					type: NOTIFICATIONS_UPDATE,
					payload: data,
				});
				if (data.length === 0) notificationBarOff();
			})
			.catch((err) => {
				//ignoring error here
				// console.log("Err:", err);
			});
	};

	return (
		<socialContext.Provider
			value={{
				isNotificationOpen: state.isNotificationOpen,
				notifications: state.notifications,
				notificationsLength: state.notificationsLength,
				notificationPaginationPage: state.notificationPaginationPage,
				notificationRead: state.notificationRead,
				notificationUnread: state.notificationUnread,
				notificationBarOn,
				notificationBarOff,
				notPush,
				notificationsPull,
				notificationsPaginationSet,
			}}>
			{props.children}
		</socialContext.Provider>
	);
};

export default SocialState;
