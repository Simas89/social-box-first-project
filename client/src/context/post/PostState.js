import React from "react";
import postReducer from "./postReducer";
import postContext from "./postContext";

import { SET_POSTS } from "../types";

const PostState = (props) => {
	const initialState = { posts: [] };
	const [state, dispatch] = React.useReducer(postReducer, initialState);

	const setPosts = (payload) => {
		dispatch({ type: SET_POSTS, payload: payload });
	};
	console.log(state);

	return (
		<postContext.Provider value={{ state, setPosts }}>
			{props.children}
		</postContext.Provider>
	);
};

export default PostState;
