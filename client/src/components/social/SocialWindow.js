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

	const graphqlCallTest = (query) => {
		graphqlCall(query, (res) => console.log(res));
	};
	const query = `
		Test
		User(name: "${context.accountState.user}"){
			_id 
			userName 
			credits 
			verified}
			`;

	// const query = `Test`;

	return (
		<div className='social-window'>
			<CreatePostBar />
			<PostItself />
			<PostItself />
			<button onClick={() => contextSocial.notPush(context.accountState.user)}>
				Send me
			</button>
			<button onClick={() => graphqlCallTest(query)}>GraphQL</button>
		</div>
	);
};

export default SocialWindow;
