import { SET_POSTS, RESET_POSTS, UPDATE_LIKES } from "../types";

export default (state, action) => {
	switch (action.type) {
		case SET_POSTS: {
			// console.log("Setting posts");
			return { ...state, posts: action.payload };
		}

		case RESET_POSTS: {
			// console.log("Setting posts");
			return { posts: [] };
		}

		case UPDATE_LIKES: {
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
