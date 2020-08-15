import {
	SET_POSTS,
	RESET_POSTS,
	EDIT_POST,
	DELETE_POST,
	UPDATE_LIKES,
	SEND_COMMENT,
	EDIT_COMMENT,
	DELETE_COMMENT,
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

		case DELETE_POST: {
			let arr = state.posts;
			arr.splice(action.payload, 1);
			return {
				...state,
				posts: arr,
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

		case EDIT_COMMENT: {
			let arr = state.posts;
			arr[action.payload.postIndex].comments[action.payload.index].textContent =
				action.payload.textContent;
			arr[action.payload.postIndex].comments[
				action.payload.index
			].edited = Date.now();
			return {
				...state,
				posts: arr,
			};
		}

		case DELETE_COMMENT: {
			let arr = state.posts;
			arr[action.payload.postIndex].comments.splice(action.payload.index, 1);
			return {
				...state,
				posts: arr,
			};
		}

		default:
			return state;
	}
};
