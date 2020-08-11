import React from "react";
import postReducer from "./postReducer";
import postContext from "./postContext";
import graphqlFetch from "../../functions/graphqlFetch";

import {
	SET_POSTS,
	RESET_POSTS,
	EDIT_POST,
	UPDATE_LIKES,
	SEND_COMMENT,
} from "../types";

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

	const sendComment = (data) => {
		// console.log(data);
		const query = `sendComment(userName: "${data.user}",
															comment: "${data.comment}",
															postID: "${data.post._id}"){
			_id
			userName
			imgsmall{
				contentType
				data
			}
			textContent
		
		}`;

		graphqlFetch(query, (res) => {
			// console.log(res);
			dispatch({
				type: SEND_COMMENT,
				payload: res.sendComment,
				index: data.post.index,
			});
		});
	};
	// console.log(state);

	// console.log("STATE:", state.posts);

	return (
		<postContext.Provider
			value={{
				state,
				setPosts,
				resetPosts,
				updatePostLikes,
				editPost,
				sendComment,
			}}>
			{props.children}
		</postContext.Provider>
	);
};

export default PostState;
