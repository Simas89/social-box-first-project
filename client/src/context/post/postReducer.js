import { SET_POSTS, UPDATE_LIKES } from "../types";

export default (state, action) => {
	switch (action.type) {
		case SET_POSTS: {
			// console.log("Setting posts");
			return { ...state, posts: action.payload };
		}
		case UPDATE_LIKES: {
			console.log(action.payload.likesPack);
			return {
				...state,

				posts: state.posts.map((post, i) =>
					i === action.payload.index
						? { ...post, likesPack: action.payload.likesPack }
						: post
				),
			};
		}

		default:
			return state;
	}
};
