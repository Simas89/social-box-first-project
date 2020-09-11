import React from "react";
import chatReducer from "./chatReducer";
import chatContext from "./chatContext";

import accContext from "../account/myContext";

// import { ApolloConsumer, gql } from "@apollo/client";
import { useQuery, useSubscription, gql } from "@apollo/client";

import {
	ADD_TARGET,
	REMOVE_TARGET,
	SET_MESSAGE_INPUT,
	SEND_A_MESSAGE,
} from "../types";

const ChatState = (props) => {
	const contextAcc = React.useContext(accContext);

	const initialState = {
		targets: [{ name: "bot001", input: "" }],
	};
	const [state, dispatch] = React.useReducer(chatReducer, initialState);

	const setMsgInput = (payload) => {
		dispatch({ type: SET_MESSAGE_INPUT, payload: payload });
	};
	const addTarget = (target) => {
		dispatch({ type: ADD_TARGET, payload: target });
	};
	const removeTarget = (target) => {
		dispatch({ type: REMOVE_TARGET, payload: target });
	};
	//////////////////////////////////////////////////////

	const GET_MESSAGES = gql`
		subscription {
			messages(userName: "${contextAcc.accountState.user}") {
				id
				content
				user
			}
		}
	`;
	// console.log(contextAcc.accountState.user);
	const Messages = () => {
		// console.log("sub sub");
		const res = useSubscription(GET_MESSAGES);
		if (!res.data) {
			return null;
		} else console.log("Chat msg", res.data.messages);
	};
	Messages();

	// const

	const sendAMessage = (data) => {
		props.apollo.mutate({
			mutation: gql`mutation {
				postMessage(userName: "${contextAcc.accountState.user}",target: "${
				state.targets[data.index].name
			}",  content: """${state.targets[data.index].input}""")
			}`,
		});

		// props.apollo.mutate({
		// 	mutation: gql`
		// 			mutation {
		// 				sendChatMsg(userName: "${data.sender}", target: "${
		// 		state.targets[data.index].name
		// 	}",content: "${state.targets[data.index].input}")
		// 			}
		// 		`,
		// });

		dispatch({ type: SEND_A_MESSAGE, payload: data.index });
	};
	// console.log("chat", state);

	return (
		<chatContext.Provider
			value={{ state, setMsgInput, addTarget, removeTarget, sendAMessage }}>
			{props.children}
		</chatContext.Provider>
	);
};

export default ChatState;
