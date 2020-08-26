import React from "react";
import landingReducer from "./landingReducer";
import landingContext from "./landingContext";

import {
	TOGGLE_LR,
	TOGGLE_REMEMBER_ME,
	SET_USER_INPUT,
	USER_INPUTS_CLEAR,
	MESSAGE_CLEAR,
	SET_MSG_INPUT,
	TOGGLE_FOCUSED,
	CAN_ANIMATE_PSW2,
} from "../types";

const LandingState = (props) => {
	const initialState = {
		LR: false,
		rememberMe: 0,

		userInputs: { userName: "", psw1: "", psw2: "" },
		msgInputs: { guest: "", email: "", msg: "" },
		focused: {
			userName: false,
			psw1: false,
			psw2: false,
			senderName: false,
			senderMail: false,
			textArea: false,
		},
		canAnimatePsw2: { expand: false, collapse: false, display: false },
	};
	const [state, dispatch] = React.useReducer(landingReducer, initialState);

	// console.log(state.userInputs.userName);

	const toggle_lr = () => {
		dispatch({ type: TOGGLE_LR });
	};
	const toggle_remember_me = () => {
		dispatch({ type: TOGGLE_REMEMBER_ME });
	};
	const set_user_input = (payload) => {
		dispatch({
			type: SET_USER_INPUT,
			payload: { type: payload.type, value: payload.value },
		});
	};
	const user_inputs_clear = () => {
		dispatch({ type: USER_INPUTS_CLEAR });
	};
	const message_clear = () => {
		dispatch({ type: MESSAGE_CLEAR });
	};
	const set_msg_input = (payload) => {
		dispatch({
			type: SET_MSG_INPUT,
			payload: { type: payload.type, value: payload.value },
		});
	};
	const toggle_focused = (payload) => {
		dispatch({
			type: TOGGLE_FOCUSED,
			payload: { type: payload.type, value: payload.value },
		});
	};
	const can_animate_psw2 = (payload) => {
		dispatch({ type: CAN_ANIMATE_PSW2, payload: payload });
	};
	const master_button_blur = () => {};

	return (
		<landingContext.Provider
			value={{
				state,
				toggle_lr,
				toggle_remember_me,
				set_user_input,
				user_inputs_clear,
				message_clear,
				set_msg_input,
				toggle_focused,
				can_animate_psw2,
				master_button_blur,
			}}>
			{props.children}
		</landingContext.Provider>
	);
};

export default LandingState;
