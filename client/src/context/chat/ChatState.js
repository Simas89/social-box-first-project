import React from "react";
import chatReducer from "./chatReducer";
import chatContext from "./chatContext";
// import { ApolloConsumer, gql } from "@apollo/client";
import { gql } from "@apollo/client";
import IO from "socket.io-client";

import {
	ADD_TARGET,
	REMOVE_TARGET,
	SET_MESSAGE_INPUT,
	SEND_A_MESSAGE,
} from "../types";
const socket = IO("https://localhost:80", { secure: true });
socket.on("connect", (rep) => console.log("Connected client"));
// socket.on("reply", (rep) => console.log(rep));

// import io from "socket.io-client";
// const socket = io();

const ChatState = (props) => {
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
	const sendAMessage = (data) => {
		socket.emit("chat", {
			userName: data.sender,
			target: state.targets[data.index].name,
			msg: state.targets[data.index].input,
		});
		// props.apollo
		// 	.mutate({
		// 		mutation: gql`
		// 			mutation {
		// 				sendChatMsg(userName: "${data.sender}", target: "${
		// 			state.targets[data.index].name
		// 		}",content: "${state.targets[data.index].input}")
		// 			}
		// 		`,
		// 	})
		// 	.then((result) => console.log(result));
		dispatch({ type: SEND_A_MESSAGE, payload: data.index });
	};
	console.log("chat", state);

	return (
		<chatContext.Provider
			value={{ state, setMsgInput, addTarget, removeTarget, sendAMessage }}>
			{props.children}
		</chatContext.Provider>
	);
};

export default ChatState;
