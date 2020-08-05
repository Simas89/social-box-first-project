import React from "react";
import postReducer from "./postReducer";
import postContext from "./postContext";

import { SET_POSTS, RESET_POSTS, UPDATE_LIKES } from "../types";

const PostState = (props) => {
	const initialState = { posts: [] };
	const [state, dispatch] = React.useReducer(postReducer, initialState);

	const resetPosts = () => {
		dispatch({ type: RESET_POSTS });
	};

	const setPosts = (payload) => {
		dispatch({ type: SET_POSTS, payload: payload });
	};

	const updatePostLikes = (payload) => {
		dispatch({ type: UPDATE_LIKES, payload: payload });
	};

	console.log("STATE:", state.posts);

	return (
		<postContext.Provider
			value={{ state, setPosts, resetPosts, updatePostLikes }}>
			{props.children}
		</postContext.Provider>
	);
};

export default PostState;
