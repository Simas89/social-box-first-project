import React from "react";
import postReducer from "./postReducer";
import postContext from "./postContext";

import { SET_POSTS, UPDATE_LIKES } from "../types";

const PostState = (props) => {
	const initialState = { posts: [] };
	const [state, dispatch] = React.useReducer(postReducer, initialState);

	const setPosts = (payload) => {
		dispatch({ type: SET_POSTS, payload: payload });
	};

	const updatePostLikes = (payload) => {
		dispatch({ type: UPDATE_LIKES, payload: payload });
	};

	console.log("STATE:", state);

	return (
		<postContext.Provider value={{ state, setPosts, updatePostLikes }}>
			{props.children}
		</postContext.Provider>
	);
};

export default PostState;
