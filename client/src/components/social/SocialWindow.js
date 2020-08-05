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

	const getPosts = (TYPE, clientUserName, target) => {
		const query = `
		getPosts(TYPE: "${TYPE}",  clientUserName: "${clientUserName}", target: "${target}"){
			_id
			userName
			textContent
			timestamp
			imgsmall{
				contentType
				data
			}
			likesPack{
				likes
				likedByMe
				approves{
					userName
					imgmicro
				}
			}
			
		}
	`;
		graphqlCall(query, (res) => {
			contextPost.setPosts(res.getPosts);
			console.log(res);
		});
	};

	// console.log("State:", posts);
	console.log(context);

	return (
		<div className='social-window'>
			<button onClick={() => contextSocial.notPush(context.accountState.user)}>
				Notification
			</button>
			<button
				onClick={() =>
					getPosts(
						"SINGLE",
						context.accountState.user,
						"5f2afbb3e879750cf4dc312a"
					)
				}>
				Get single
			</button>
			<button
				onClick={() => getPosts("USER", context.accountState.user, "000")}>
				Get user posts
			</button>
			<button onClick={() => getPosts("FEED", context.accountState.user)}>
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
						imgsmall={item.imgsmall}
					/>
				))}
		</div>
	);
};

export default SocialWindow;
