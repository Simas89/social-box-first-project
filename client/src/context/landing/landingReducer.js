import {
	TOGGLE_LR,
	TOGGLE_REMEMBER_ME,
	SET_USER_INPUT,
	USER_INPUTS_CLEAR,
	SET_MSG_INPUT,
	TOGGLE_FOCUSED,
	CAN_ANIMATE_PSW2,
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case TOGGLE_LR: {
			return { ...state, LR: !state.LR };
		}
		case TOGGLE_REMEMBER_ME: {
			return { ...state, rememberMe: !state.rememberMe };
		}
		case SET_USER_INPUT: {
			if (action.payload.value.length <= 18)
				return {
					...state,
					userInputs: {
						...state.userInputs,
						[action.payload.type]: action.payload.value,
					},
				};
			break;
		}
		case USER_INPUTS_CLEAR: {
			return {
				...state,
				userInputs: {
					userName: "",
					psw1: "",
					psw2: "",
				},
			};
		}
		case SET_MSG_INPUT: {
			return {
				...state,
				msgInputs: {
					...state.msgInputs,
					[action.payload.type]: action.payload.value,
				},
			};
		}
		case TOGGLE_FOCUSED: {
			return {
				...state,
				focused: {
					...state.focused,
					[action.payload.type]: action.payload.value,
				},
			};
		}
		case CAN_ANIMATE_PSW2: {
			return { ...state, canAnimatePsw2: action.payload };
		}
		default:
			return state;
	}
};
