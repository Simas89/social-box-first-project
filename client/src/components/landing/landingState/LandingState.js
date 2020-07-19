import React from "react";
import formikeReducer from "./formikeReducer";
import landingContext from "./landingContext";

const PERSIST = "PERSIST";
const TOGGLE_LR = "TOGGLE_LR";
const TOGGLE_REMEMBER_ME = "TOGGLE_REMEMBER_ME";
const SET_USER_INPUT = "SET_USER_INPUT";
const TOGGLE_FOCUSED = "TOGGLE_FOCUSED";

const LandingState = (props) => {
	const context = React.useContext(landingContext);
	const initialState = {
		LR: false,
		rememberMe: 1,

		userInputs: { userName: "", psw1: "", psw2: "" },
		focused: {
			userName: false,
			psw1: false,
			psw2: false,
			senderName: false,
			senderMail: false,
			textArea: false,
		},
	};

	const [state, dispatch] = React.useReducer(formikeReducer, initialState);
	const persist = (data) => {
		console.log(data);
		dispatch({
			type: PERSIST,
			payload: data,
		});
	};
	const toggle_focused = (payload) => {
		console.log(payload);
		dispatch({
			type: TOGGLE_FOCUSED,
			payload: { type: payload.type, value: payload.value },
		});
	};
	const toggle_remember_me = () => {
		dispatch({ type: TOGGLE_REMEMBER_ME });
	};

	return (
		<landingContext.Provider
			value={{
				state,
				toggle_focused,
				toggle_remember_me,
			}}>
			{props.children}
		</landingContext.Provider>
	);
};

export default LandingState;
