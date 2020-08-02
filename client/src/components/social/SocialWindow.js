import React from "react";
import "./css/SocialWindow.css";
import socialContext from "../../context/social/socialContext";
import myContext from "../../context/account/myContext";
import postContext from "../../context/post/postContext";
// import Post from "./Post";
import CreatePostBar from "./post/CreatePostBar";
import PostItself from "./post/PostItself";
import graphqlCall from "../../functions/graphqlCall";

const SocialWindow = () => {
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);
	const contextSocial = React.useContext(socialContext);

	const getPosts = (TYPE, id) => {
		const query = `
		getPosts(TYPE: "${TYPE}", id: "${id}"){
			_id
			userName
			textContent
			likes
			timestamp
			likedByMe
			imgsmall{
				contentType
				data
			}
		}
	`;

		graphqlCall(query, (res) => {
			contextPost.setPosts(res.getPosts);
		});
	};

	// console.log("State:", posts);

	return (
		<div className='social-window'>
			<CreatePostBar />

			{contextPost.state.posts &&
				contextPost.state.posts.map((item) => (
					<PostItself
						key={item._id}
						_id={item._id}
						userName={item.userName}
						textContent={item.textContent}
						timestamp={item.timestamp}
						imgsmall={item.imgsmall}
						likes={item.likes}
						likedByMe={item.likedByMe}
					/>
				))}
			<button onClick={() => contextSocial.notPush(context.accountState.user)}>
				Send me
			</button>
			<button onClick={() => getPosts("USER", context.accountState.user)}>
				Get posts
			</button>
		</div>
	);
};

export default SocialWindow;
