import React from "react";
import chatReducer from "./chatReducer";
import chatContext from "./chatContext";

import accContext from "../account/myContext";

// import { ApolloConsumer, gql } from "@apollo/client";
import { useSubscription, gql } from "@apollo/client";

import {
	ADD_TARGET,
	REMOVE_TARGET,
	SET_MESSAGE_INPUT,
	UPDATE_MESSAGES,
} from "../types";

const ChatState = (props) => {
	const contextAcc = React.useContext(accContext);

	const initialState = {
		targets: [
			// {
			// 	name: "RacoonX",
			// 	input: "",
			// 	msgData: [],
			// },
		],
	};
	const [state, dispatch] = React.useReducer(chatReducer, initialState);
	// console.log(state);

	const setMsgInput = (payload) => {
		dispatch({ type: SET_MESSAGE_INPUT, payload: payload });
	};
	const addTarget = (target) => {
		dispatch({ type: ADD_TARGET, payload: target });
	};
	const removeTarget = (target) => {
		dispatch({ type: REMOVE_TARGET, payload: target });
	};

	///////////////////////////////////////////////

	const GET_MESSAGES = gql`
	subscription {
		messages(userName: "${contextAcc.accountState.user}") {
			target
			msg
			{
				id
				content
				user
			}
		}
	}
`;

	useSubscription(GET_MESSAGES, {
		onSubscriptionData: ({ subscriptionData: { data } }) => {
			// console.log(data);

			const index = state.targets
				.map((e) => e.name)
				.indexOf(data.messages.target);
			// console.log("index:", index, data.messages.target);

			if (index !== -1) {
				dispatch({ type: UPDATE_MESSAGES, payload: data });
			} else {
				console.log("Need to add target");
				dispatch({ type: ADD_TARGET, payload: data.messages.target });
				dispatch({ type: UPDATE_MESSAGES, payload: data });
			}
			setTimeout(() => console.log("ChatState:", state), 1);
		},
	});

	//////////////////////////////////////////////////////

	// console.log("ChatState:", state);

	return (
		<chatContext.Provider
			value={{
				state,
				apollo: props.apollo,
				setMsgInput,
				addTarget,
				removeTarget,
			}}>
			{props.children}
		</chatContext.Provider>
	);
};

export default ChatState;
