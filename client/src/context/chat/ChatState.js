import React from "react";
import chatReducer from "./chatReducer";
import chatContext from "./chatContext";
// import { ApolloConsumer, gql } from "@apollo/client";
import { useQuery, useSubscription, gql } from "@apollo/client";

import {
	ADD_TARGET,
	REMOVE_TARGET,
	SET_MESSAGE_INPUT,
	SEND_A_MESSAGE,
} from "../types";

const ChatState = (props) => {
	const SOCKET_URI = process.env.REACT_APP_SOCKET_URI;
	console.log(SOCKET_URI);
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

	const GET_SUB = gql`
		subscription {
			count
		}
	`;

	const GET_TEST = gql`
		query {
			test
		}
	`;
	let SUB = useSubscription(GET_SUB, { pollInterval: 500 });
	console.log("SUB:", SUB);
	// let QUE = useQuery(GET_TEST, { pollInterval: 500 });
	// console.log("QUE:", QUE.data);
	const sendAMessage = (data) => {
		console.log("trig");
		// props.apollo
		// 	.query({
		// 		query: gql`
		// 			query {
		// 				test
		// 			}
		// 		`,
		// 	})
		// 	.then((result) => console.log(result));

		props.apollo
			.mutate({
				mutation: gql`
					mutation {
						sendChatMsg(userName: "${data.sender}", target: "${
					state.targets[data.index].name
				}",content: "${state.targets[data.index].input}")
					}
				`,
			})
			.then((result) => console.log("MUT:", result));

		// props.apollo
		// 	.subscribe({
		// 		subscription: gql`
		// 			subscription {
		// 				count
		// 			}
		// 		`,
		// 	})
		// 	.then((result) => console.log(result));

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
