import {
	SET_POSTS,
	RESET_POSTS,
	EDIT_POST,
	UPDATE_LIKES,
	SEND_COMMENT,
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case SET_POSTS: {
			return { ...state, posts: action.payload };
		}

		case RESET_POSTS: {
			return { posts: [] };
		}

		case EDIT_POST: {
			return {
				...state,
				posts: state.posts.map((post, i) =>
					i === action.payload.index
						? { ...post, edited: action.payload.time }
						: post
				),
			};
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

		case SEND_COMMENT: {
			return {
				...state,
				posts: state.posts.map((post, i) =>
					i === action.index
						? {
								...post,
								comments: state.posts[i].comments.concat(action.payload),
						  }
						: post
				),
			};
		}

		default:
			return state;
	}
};
