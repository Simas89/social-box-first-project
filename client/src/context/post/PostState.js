import React from "react";
import postReducer from "./postReducer";
import postContext from "./postContext";

import { SET_POSTS, RESET_POSTS, EDIT_POST, UPDATE_LIKES } from "../types";

const PostState = (props) => {
	const initialState = { posts: [] };
	const [state, dispatch] = React.useReducer(postReducer, initialState);

	const resetPosts = () => {
		dispatch({ type: RESET_POSTS });
	};

	const setPosts = (payload) => {
		dispatch({ type: SET_POSTS, payload: payload });
	};

	const editPost = (payload) => {
		dispatch({ type: EDIT_POST, payload: payload });
	};

	const updatePostLikes = (payload) => {
		dispatch({ type: UPDATE_LIKES, payload: payload });
	};
	console.log(state);

	// console.log("STATE:", state.posts);

	return (
		<postContext.Provider
			value={{ state, setPosts, resetPosts, updatePostLikes, editPost }}>
			{props.children}
		</postContext.Provider>
	);
};

export default PostState;
