import { ADD_TARGET, REMOVE_TARGET } from "../types";

export default (state, action) => {
	switch (action.type) {
		case ADD_TARGET: {
			let newTargets = state.targets;

			let canInsert = 1;
			newTargets.forEach((element) => {
				if (element.name === action.payload) canInsert = 0;
			});

			if (canInsert)
				if (newTargets.length < 5) {
					newTargets.unshift({ name: action.payload, input: "" });
				} else {
					newTargets.shift();
					newTargets.unshift({ name: action.payload, input: "" });
				}
			return { ...state, targets: newTargets };
		}

		case REMOVE_TARGET: {
			console.log(action.payload);
			let newTargets = state.targets;
			newTargets.splice(action.payload, 1);

			return { ...state, targets: newTargets };
		}

		default:
			return state;
	}
};
