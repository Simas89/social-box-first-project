import {
	TOGGLE_LR,
	TOGGLE_REMEMBER_ME,
	SET_USER_INPUT,
	TOGGLE_FOCUSED,
	INITIAL_RENDER,
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
		case TOGGLE_FOCUSED: {
			return {
				...state,
				focused: {
					...state.focused,
					[action.payload.type]: action.payload.value,
				},
			};
		}
		case INITIAL_RENDER: {
			return { ...state, initialRender: false };
		}
		default:
			return state;
	}
};
