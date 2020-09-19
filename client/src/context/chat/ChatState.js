import React from "react";
import chatReducer from "./chatReducer";
import chatContext from "./chatContext";
import accContext from "../account/myContext";
import { useSubscription, gql, useLazyQuery } from "@apollo/client";
import {
	ADD_TARGET,
	REMOVE_TARGET,
	REMOVE_TARGET_ALL,
	SET_ONLY_ONE_TARGET_ID0,
	SET_MESSAGE_INPUT,
	UPDATE_MESSAGES,
	CHAT_WINDOW_STATE,
	SET_CAN_SCROLL,
	SET_IS_TYPING,
	SET_NTF_OPEN,
	SET_NTF_DATA,
	DEL_ALL_NOTIFICATIONS,
	DEL_ONE_NOTIFICATION,
	MARK_ALL_NOTIFICATIONS,
	MARK_ONE_NOTIFICATION,
	SET_NTFS,
} from "../types";

let timeoutId = {};

const ChatState = (props) => {
	const contextAcc = React.useContext(accContext);
	const initialState = {
		targets: [
			// {
			// 	name: "RacoonX",
			//  msgData: [],
			// 	input: "",
			// 	isWindowOpen: true,
			// 	canScroll: false,
			//  isTyping: false,
			// },
		],
		isNtfOpen: false,
		chatsNtf: [
			// {
			// 	date: "1600449495790",
			// 	imgsmall: {
			// 		contentType: "image/png",
			// 		data: "ygfhghgfjhg",
			// 	},
			// 	lastMsg: "gggg",
			// 	seen: true,
			// 	user: "Aidas",
			// 	_id: "5f64ebd7cb4eb331443b1038",
			// },
		],
		ntfs: {
			new: [],
			old: 0,
		},
	};
	const [state, dispatch] = React.useReducer(chatReducer, initialState);
	React.useEffect(() => console.log(state), [state]);

	const [isMobile, setIsMobile] = React.useState(
		window.innerWidth >= 420 ? false : true
	);
	if (isMobile && state.targets.length > 1) {
		dispatch({ type: SET_ONLY_ONE_TARGET_ID0 });
	}
	const resizeEvent = () => {
		window.innerWidth >= 420 ? setIsMobile(false) : setIsMobile(true);
	};
	React.useEffect(() => {
		window.addEventListener("resize", resizeEvent);
		return () => {
			window.removeEventListener("resize", resizeEvent);
		};
	}, []);

	const GET_CHATS_NTF = gql`
		query {
			getChatsNtf(userName: "${contextAcc.accountState.user}"){
				_id
				user
				lastMsg
				date
				seen
				imgsmall{
					contentType
					data
				}
			}
		}
	`;
	const [getChatsNtfQUE] = useLazyQuery(GET_CHATS_NTF, {
		fetchPolicy: "network-only",
		onCompleted: (data) => {
			dispatch({ type: SET_NTF_DATA, payload: data.getChatsNtf });
		},
	});
	/////////////////////////////////////////////////////

	const GET_MESSAGES = gql`
		query($target: String) {
			messages(userName: "${contextAcc.accountState.user}", target: $target) {
				target
				msg
				{
					id
					content
					user
					date
				}
			}
		}
	`;
	const [getMessagesQUE] = useLazyQuery(GET_MESSAGES, {
		fetchPolicy: "network-only",
		onCompleted: (data) => {
			// console.log(data);
			dispatch({ type: UPDATE_MESSAGES, payload: data });
			const timeoutID = window.setTimeout(() => {
				dispatch({
					type: SET_CAN_SCROLL,
					payload: { target: data.messages.target, set: true },
				});
				clearTimeout(timeoutID);
			}, 1);
		},
	});

	/////////////////////////////////////////////////////////
	const SUB_NTFS = gql`
	subscription {
		ntfs(userName: "${contextAcc.accountState.user}") {
			new
			old
		}
	}
`;
	useSubscription(SUB_NTFS, {
		onSubscriptionData: ({ subscriptionData: { data } }) => {
			if (data) {
				console.log("SUB_NTFS", data);
				dispatch({
					type: SET_NTFS,
					payload: data,
				});
			}
		},
	});
	/////////////////////////////////////////////////////////
	const SUB_ISTYPING = gql`
		subscription {
			isTyping(userName: "${contextAcc.accountState.user}") {
				set
				userName
			}
		}
	`;
	useSubscription(SUB_ISTYPING, {
		onSubscriptionData: ({ subscriptionData: { data } }) => {
			clearTimeout(timeoutId[data.isTyping.userName]);
			if (data.isTyping.set) {
				dispatch({
					type: SET_IS_TYPING,
					payload: { userName: data.isTyping.userName, set: true },
				});
				timeoutId[data.isTyping.userName] = setTimeout(() => {
					clearTimeout(timeoutId[data.isTyping.userName]);
					dispatch({
						type: SET_IS_TYPING,
						payload: { userName: data.isTyping.userName, set: false },
					});
				}, 3000);
			} else {
				dispatch({
					type: SET_IS_TYPING,
					payload: { userName: data.isTyping.userName, set: false },
				});
			}
		},
	});
	///////////////////////////////////////////////////////
	const SUB_MESSAGES = gql`
	subscription {
		messages(userName: "${contextAcc.accountState.user}") {
			target
			msg
			{
				id
				content
				user
				date
			}
		}
	}
`;
	useSubscription(SUB_MESSAGES, {
		onSubscriptionData: ({ subscriptionData: { data } }) => {
			console.log(data);
			const index = state.targets
				.map((e) => e.name)
				.indexOf(data.messages.target);

			if (!isMobile) {
				if (index !== -1) {
					dispatch({ type: UPDATE_MESSAGES, payload: data });
					reportIfNtfSeen(
						data.messages.target,
						true,
						data.messages.msg[data.messages.msg.length - 1].user
					);
				} else {
					dispatch({ type: ADD_TARGET, payload: data.messages.target });
					dispatch({ type: UPDATE_MESSAGES, payload: data });
					const timeoutID = setTimeout(() => {
						dispatch({
							type: SET_CAN_SCROLL,
							payload: { target: data.messages.target, set: true },
						});
						clearTimeout(timeoutID);
					}, 1);
					reportIfNtfSeen(
						data.messages.target,
						false,
						data.messages.msg[data.messages.msg.length - 1].user
					);
				}
				// setTimeout(() => console.log("ChatState:", state), 1);
			} else {
				if (index !== -1) {
					dispatch({ type: UPDATE_MESSAGES, payload: data });
					reportIfNtfSeen(
						data.messages.target,
						true,
						data.messages.msg[data.messages.msg.length - 1].user
					);
				} else {
					dispatch({ type: REMOVE_TARGET_ALL });
					dispatch({ type: ADD_TARGET, payload: data.messages.target });
					dispatch({ type: UPDATE_MESSAGES, payload: data });
					const timeoutID = setTimeout(() => {
						dispatch({
							type: SET_CAN_SCROLL,
							payload: { target: data.messages.target, set: true },
						});
						clearTimeout(timeoutID);
					}, 1);
					reportIfNtfSeen(
						data.messages.target,
						false,
						data.messages.msg[data.messages.msg.length - 1].user
					);
				}
			}
		},
	});
	const reportIfNtfSeen = (target, seen, lastMsgUser) => {
		if (lastMsgUser !== contextAcc.accountState.user) {
			let reallySeen = false;
			if (seen) {
				const windowOpen = state.ntfs.new.includes(target);
				reallySeen = !windowOpen;

				const index = state.targets
					.map((element) => element.name)
					.indexOf(target);
				if (!state.targets[index].isWindowOpen) reallySeen = false;

				// console.log("index", index);

				// state.targets.

				props.apollo.mutate({
					mutation: gql`mutation {
					reportIfNtfSeen(userName: "${contextAcc.accountState.user}", target: "${target}",seen: ${reallySeen})
				}`,
				});
			} else {
				props.apollo.mutate({
					mutation: gql`mutation {
					reportIfNtfSeen(userName: "${contextAcc.accountState.user}", target: "${target}",seen: ${seen})
				}`,
				});
			}
		}
	};
	//////////////////////////////////////////////////////
	const setMsgInput = (payload) => {
		dispatch({ type: SET_MESSAGE_INPUT, payload: payload });
	};
	const addTarget = (target) => {
		getMessagesQUE({ variables: { target } });

		if (!isMobile) {
			dispatch({ type: ADD_TARGET, payload: target });
		} else {
			dispatch({ type: REMOVE_TARGET_ALL });
			dispatch({ type: ADD_TARGET, payload: target });
		}
	};
	const removeTarget = (target) => {
		dispatch({ type: REMOVE_TARGET, payload: target });
	};
	const setChatWindowState = (data) => {
		dispatch({
			type: CHAT_WINDOW_STATE,
			payload: { index: data.index, set: data.set },
		});
	};
	const setCanScroll = (data) => {
		dispatch({
			type: SET_CAN_SCROLL,
			payload: { index: data.index, set: data.set },
		});
	};
	const setNtfOpen = (set) => {
		if (set) {
			getChatsNtfQUE();
		}
		dispatch({
			type: SET_NTF_OPEN,
			payload: set,
		});
	};
	const delAllNotifications = () => {
		props.apollo.mutate({
			mutation: gql`
				mutation {
					delAllNotifications(userName: "${contextAcc.accountState.user}")
				}
			`,
		});
		dispatch({
			type: DEL_ALL_NOTIFICATIONS,
		});
	};
	const delOneNotification = (id) => {
		props.apollo.mutate({
			mutation: gql`
				mutation {
					delOneNotification(userName: "${contextAcc.accountState.user}", id: "${id}")
				}
			`,
		});

		const timeoutID = setTimeout(() => {
			dispatch({
				type: DEL_ONE_NOTIFICATION,
				payload: id,
			});
			clearTimeout(timeoutID);
		}, 1);

		// setNtfOpen(true);
	};
	const markAllNotifications = () => {
		props.apollo.mutate({
			mutation: gql`
				mutation {
					markAllNotifications(userName: "${contextAcc.accountState.user}")
				}
			`,
		});
		dispatch({
			type: MARK_ALL_NOTIFICATIONS,
		});
	};
	const markOneNotification = (target) => {
		props.apollo.mutate({
			mutation: gql`
				mutation {
					markOneNotification(userName: "${contextAcc.accountState.user}",target: "${target}")
				}
			`,
		});
		// console.log(target);
		dispatch({
			type: MARK_ONE_NOTIFICATION,
			payload: target,
		});
	};

	//////////////////////////////////////////////////////
	// console.log("ChatState:", state);

	return (
		<chatContext.Provider
			value={{
				state,
				isMobile,
				apollo: props.apollo,
				setMsgInput,
				addTarget,
				removeTarget,
				setChatWindowState,
				setCanScroll,

				setNtfOpen,
				delAllNotifications,
				delOneNotification,
				markAllNotifications,
				markOneNotification,
			}}>
			{props.children}
		</chatContext.Provider>
	);
};

export default ChatState;
