import { SET_POSTS } from "../types";

export default (state, action) => {
	switch (action.type) {
		case SET_POSTS: {
			// console.log("Setting posts");
			return { ...state, posts: action.payload };
		}

		default:
			return state;
	}
};
