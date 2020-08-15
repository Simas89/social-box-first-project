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
			)}", textContent: """${text}""")`,
			() => {
				graphqlFetch(
					gqlGetPostsQuery("FEED", context.accountState.user),
					(res) => {
						contextPost.setPosts(res.getPosts);
					}
				);
			}
		);
		setText("");
	};

	return (
		<TextArea
			placeholder='Write a post..'
			value={text}
			minRows={2}
			setText={(txt) => setText(txt)}
			iconDisplay={true}
			emojiDisplay={true}
			iconName='send'
			iconClick={() => postPost()}
		/>
	);
};

export default CreatePostBar;
