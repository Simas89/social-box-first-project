import {
	ADD_TARGET,
	REMOVE_TARGET,
	SET_MESSAGE_INPUT,
	SEND_A_MESSAGE,
} from "../types";

export default (state, { type, payload }) => {
	switch (type) {
		case ADD_TARGET: {
			let newTargets = state.targets;

			let canInsert = 1;
			newTargets.forEach((element) => {
				if (element.name === payload) canInsert = 0;
			});

			if (canInsert)
				if (newTargets.length < 5) {
					newTargets.unshift({ name: payload, input: "" });
				} else {
					newTargets.shift();
					newTargets.unshift({ name: payload, input: "" });
				}
			return { ...state, targets: newTargets };
		}

		case REMOVE_TARGET: {
			let newTargets = state.targets;
			newTargets.splice(payload, 1);

			return { ...state, targets: newTargets };
		}

		case SET_MESSAGE_INPUT: {
			let newTargets = state.targets;
			newTargets[payload.index] = {
				...newTargets[payload.index],
				input: payload.value,
			};

			return { ...state, targets: newTargets };
		}

		case SEND_A_MESSAGE: {
			let newTargets = state.targets;
			newTargets[payload].input = "";

			return { ...state };
		}

		default:
			return state;
	}
};
