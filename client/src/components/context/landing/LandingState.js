import React from "react";
import landingReducer from "./landingReducer";
import landingContext from "./landingContext";

import {
	TOGGLE_LR,
	TOGGLE_REMEMBER_ME,
	SET_USER_INPUT,
	TOGGLE_FOCUSED,
	INITIAL_RENDER,
} from "../types";

const LandingState = (props) => {
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
		initialRender: true,
	};
	const [state, dispatch] = React.useReducer(landingReducer, initialState);

	const toggle_lr = () => {
		dispatch({ type: TOGGLE_LR });
	};
	const toggle_remember_me = () => {
		dispatch({ type: TOGGLE_REMEMBER_ME });
	};
	const set_user_input = (payload) => {
		console.log(payload);
		dispatch({
			type: SET_USER_INPUT,
			payload: { type: payload.type, value: payload.value },
		});
	};
	const toggle_focused = (payload) => {
		dispatch({
			type: TOGGLE_FOCUSED,
			payload: { type: payload.type, value: payload.value },
		});
	};
	const initial_render_off = () => {
		dispatch({ type: INITIAL_RENDER });
	};

	return (
		<landingContext.Provider
			value={{
				state,
				toggle_lr,
				toggle_remember_me,
				set_user_input,
				toggle_focused,
				initial_render_off,
			}}>
			{props.children}
		</landingContext.Provider>
	);
};

export default LandingState;
