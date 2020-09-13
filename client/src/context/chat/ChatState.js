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
} from "../types";

const ChatState = (props) => {
	const contextAcc = React.useContext(accContext);
	const initialState = {
		targets: [
			// {
			// 	name: "RacoonX",
			// 	input: "",
			// 	isWindowOpen: true,
			// 	canScroll: false,
			// 	msgData: [],
			// },
		],
	};
	const [state, dispatch] = React.useReducer(chatReducer, initialState);
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
			console.log(data);
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

	// console.log(getMessagesQUEdata.data);
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
			// console.log(data);

			const index = state.targets
				.map((e) => e.name)
				.indexOf(data.messages.target);

			if (!isMobile) {
				if (index !== -1) {
					dispatch({ type: UPDATE_MESSAGES, payload: data });
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
				}
				setTimeout(() => console.log("ChatState:", state), 1);
			} else {
				if (index !== -1) {
					dispatch({ type: UPDATE_MESSAGES, payload: data });
				} else {
					dispatch({ type: REMOVE_TARGET_ALL });
					dispatch({ type: ADD_TARGET, payload: data.messages.target });
					dispatch({ type: UPDATE_MESSAGES, payload: data });
					setTimeout(() => {
						dispatch({
							type: SET_CAN_SCROLL,
							payload: { target: data.messages.target, set: true },
						});
					}, 1);
				}
			}
		},
	});
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
			}}>
			{props.children}
		</chatContext.Provider>
	);
};

export default ChatState;
