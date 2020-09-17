import {
	ADD_TARGET,
	REMOVE_TARGET,
	REMOVE_TARGET_ALL,
	SET_ONLY_ONE_TARGET_ID0,
	SET_MESSAGE_INPUT,
	UPDATE_MESSAGES,
	CHAT_WINDOW_STATE,
	SET_CAN_SCROLL,
	SET_IS_TYPING,
	SET_NTF_OPEN,
	SET_NTF_DATA,
	DEL_ALL_NOTIFICATIONS,
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
					newTargets.unshift({
						name: payload,
						msgData: [],
						input: "",
						isWindowOpen: true,
						canScroll: false,
						isTyping: false,
					});
				} else {
					// newTargets.shift();
					newTargets.unshift({
						name: payload,
						msgData: [],
						input: "",
						isWindowOpen: true,
						canScroll: false,
						isTyping: false,
					});
				}
			return { ...state, targets: newTargets };
		}

		case REMOVE_TARGET: {
			let newTargets = state.targets;
			newTargets.splice(payload, 1);
			return { ...state, targets: newTargets };
		}

		case REMOVE_TARGET_ALL: {
			let newTargets = [];
			return { ...state, targets: newTargets };
		}

		case SET_ONLY_ONE_TARGET_ID0: {
			let newTargets = [state.targets[state.targets.length - 1]];
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

		case UPDATE_MESSAGES: {
			let newTargets = state.targets;
			const index = newTargets
				.map((e) => e.name)
				.indexOf(payload.messages.target);
			newTargets[index].msgData = payload.messages.msg;
			return { ...state, targets: newTargets };
		}

		case CHAT_WINDOW_STATE: {
			let newTargets = state.targets;
			newTargets[payload.index].isWindowOpen = payload.set;
			return { ...state, targets: newTargets };
		}

		case SET_CAN_SCROLL: {
			let newTargets = state.targets;
			const index = newTargets.map((e) => e.name).indexOf(payload.target);
			newTargets[index].canScroll = payload.set;
			return { ...state, targets: newTargets };
		}

		case SET_IS_TYPING: {
			const index = state.targets.map((e) => e.name).indexOf(payload.userName);
			if (index !== -1) {
				let newTargets = state.targets;
				if (payload.set) {
					newTargets[index].isTyping = true;
				} else {
					newTargets[index].isTyping = false;
				}

				return { ...state, targets: newTargets };
			} else return state;
		}

		case SET_NTF_OPEN: {
			return { ...state, isNtfOpen: payload };
		}

		case SET_NTF_DATA: {
			return { ...state, chatsNtf: payload };
		}

		case DEL_ALL_NOTIFICATIONS: {
			return { ...state, chatsNtf: [] };
		}

		default:
			return state;
	}
};
