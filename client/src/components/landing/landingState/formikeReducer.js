const TOGGLE_LR = "TOGGLE_LR";
const TOGGLE_REMEMBER_ME = "TOGGLE_REMEMBER_ME";
const SET_USER_INPUT = "SET_USER_INPUT";
const TOGGLE_FOCUSED = "TOGGLE_FOCUSED";
const PERSIST = "PERSIST";

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
		default:
			return state;
	}
};
