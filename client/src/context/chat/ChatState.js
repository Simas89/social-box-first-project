import React from "react";
import chatReducer from "./chatReducer";
import chatContext from "./chatContext";
import graphqlFetch from "../../functions/graphqlFetch";

import { ADD_TARGET, REMOVE_TARGET } from "../types";

const ChatState = (props) => {
	const initialState = {
		targets: [{ name: "Simas", input: "" }],
	};
	const [state, dispatch] = React.useReducer(chatReducer, initialState);

	const setInput = (value) => {
		console.log(value);
	};
	const addTarget = (target) => {
		dispatch({ type: ADD_TARGET, payload: target });
	};
	const removeTarget = (target) => {
		dispatch({ type: REMOVE_TARGET, payload: target });
	};
	console.log(state);

	return (
		<chatContext.Provider value={{ state, setInput, addTarget, removeTarget }}>
			{props.children}
		</chatContext.Provider>
	);
};

export default ChatState;
