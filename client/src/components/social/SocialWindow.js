import React from "react";
import "./css/SocialWindow.css";
import socialContext from "../../context/social/socialContext";
import myContext from "../../context/account/myContext";
import postContext from "../../context/post/postContext";
// import Post from "./Post";
import CreatePostBar from "./post/CreatePostBar";
import PostItself from "./post/PostItself";
import graphqlFetch from "../../functions/graphqlFetch";
import gqlGetPostsQuery from "../../functions/gqlGetPostsQuery";

const SocialWindow = () => {
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);
	const contextSocial = React.useContext(socialContext);

	React.useEffect(
		() => getPosts(gqlGetPostsQuery("FEED", context.accountState.user)),
		//eslint-disable-next-line
		[]
	);

	const getPosts = (query) => {
		graphqlFetch(query, (res) => {
			contextPost.setPosts(res.getPosts);
			// console.log(res);
		});
	};

	// console.log("State:", posts);
	// console.log(context);

	return (
		<div className='social-window'>
			<button onClick={() => contextSocial.notPush(context.accountState.user)}>
				Notification
			</button>
			<button
				onClick={() =>
					getPosts(
						gqlGetPostsQuery(
							"SINGLE",
							context.accountState.user,
							"5f2c5502b705140cc0ef3f63"
						)
					)
				}>
				Get single
			</button>
			<button
				onClick={() =>
					getPosts(gqlGetPostsQuery("USER", context.accountState.user, "000"))
				}>
				Get user posts
			</button>
			<button
				onClick={() =>
					getPosts(gqlGetPostsQuery("FEED", context.accountState.user))
				}>
				Get full feed
			</button>

			<CreatePostBar />

			{contextPost.state.posts &&
				contextPost.state.posts.map((item, index) => (
					<PostItself
						key={item._id}
						_id={item._id}
						index={index}
						userName={item.userName}
						textContent={item.textContent}
						timestamp={item.timestamp}
						edited={item.edited}
						imgsmall={item.imgsmall}
					/>
				))}
		</div>
	);
};

export default SocialWindow;
