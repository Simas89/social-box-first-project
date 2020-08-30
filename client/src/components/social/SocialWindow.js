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
			console.log(res);

			res.getPosts.sort((a, b) => {
				return a.timestamp < b.timestamp
					? 1
					: b.timestamp < a.timestamp
					? -1
					: 0;
			});

			contextPost.setPosts(res.getPosts);
		});
	};

	// console.log("State:", posts);
	// console.log(context);

	let ntfCounter = contextSocial.notifications.length;

	return (
		<div className='social-window'>
			<div className='btns' style={{ position: "fixed", left: 0, zIndex: 5 }}>
				<button
					onClick={() => {
						ntfCounter++;
						contextSocial.notPush(ntfCounter);
					}}>
					Notification
				</button>
				<button
					onClick={() =>
						getPosts(
							gqlGetPostsQuery(
								"SINGLE",
								context.accountState.user,
								"5f32e52bcf43334fb443a0c7"
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
			</div>

			<CreatePostBar />
			{contextPost.state.posts &&
				contextPost.state.posts.map((item, index) => (
					<PostItself
						key={item._id}
						_id={item._id}
						index={index}
						userName={item.userName}
						isVerified={item.isVerified}
						textContent={item.textContent}
						timestamp={item.timestamp}
						isOnline={item.isOnline}
						edited={item.edited}
						imgsmall={item.imgsmall}
					/>
				))}
		</div>
	);
};

export default SocialWindow;
