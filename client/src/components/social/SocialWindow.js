import React from "react";
import "./css/SocialWindow.css";
import socialContext from "../../context/social/socialContext";
import myContext from "../../context/account/myContext";
// import Post from "./Post";
import CreatePostBar from "./CreatePostBar";
import PostItself from "./PostItself";
import graphqlCall from "../../functions/graphqlCall";

const SocialWindow = () => {
	const context = React.useContext(myContext);
	const contextSocial = React.useContext(socialContext);
	const [posts, setPosts] = React.useState([]);

	// getPostsUser(userName: "${context.accountState.user}")
	const getPosts = () => {
		const query = `
		
		getPosts(TYPE: "SINGLE", postID: "5f2329bbcea7bc26c4aa9982"){
			_id
			userName
			textContent
			likes
			timestamp
			imgsmall{
				contentType
				data
			}
			
			
		},
		UserTest(name: "000")

			`;

		graphqlCall(query, (res) => {
			console.log("Res: ", res);
			setPosts(res.getPosts);
		});
	};

	console.log("State:", posts);

	return (
		<div className='social-window'>
			<CreatePostBar />
			{/* <PostItself /> */}

			{posts &&
				posts.map((item) => (
					<PostItself
						key={item._id}
						userName={item.userName}
						textContent={item.textContent}
						likes={item.likes}
						timestamp={item.timestamp}
						imgsmall={item.imgsmall}
					/>
				))}
			<button onClick={() => contextSocial.notPush(context.accountState.user)}>
				Send me
			</button>
			<button onClick={() => getPosts()}>Get posts</button>
		</div>
	);
};

export default SocialWindow;
