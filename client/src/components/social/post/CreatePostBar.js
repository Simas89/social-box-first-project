import React from "react";
import "./css/PostBar.css";
import TextArea from "./TextArea";
import myContext from "../../../context/account/myContext";
import postContext from "../../../context/post/postContext";
import graphqlFetch from "../../../functions/graphqlFetch";
import gqlGetPostsQuery from "../../../functions/gqlGetPostsQuery";

const CreatePostBar = () => {
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);
	const [text, setText] = React.useState("");

	const postPost = () => {
		graphqlFetch(
			`addPost(token: "${sessionStorage.getItem(
				"token"
			)}", textContent: "${text}")`,
			() => {
				graphqlFetch(
					gqlGetPostsQuery("FEED", context.accountState.user),
					(res) => {
						contextPost.setPosts(res.getPosts);
					}
				);
			}
		);
	};

	console.log(text);

	return (
		<div>
			<div>
				<TextArea
					placeholder='Write a post..'
					value={text}
					minRows={1}
					setText={(txt) => setText(txt)}
				/>
				<button onClick={() => postPost()}>POST</button>
			</div>
		</div>
	);
};

export default CreatePostBar;
