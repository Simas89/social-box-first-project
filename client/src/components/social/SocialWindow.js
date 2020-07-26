import React from "react";
import socialContext from "../../context/social/socialContext";
import myContext from "../../context/account/myContext";
import styled from "styled-components";
// import Post from "./Post";
import CreatePost from "./CreatePost";
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
		<SocialWindowStyle>
			<button onClick={() => contextSocial.notPush(context.accountState.user)}>
				Send me
			</button>
			<button onClick={() => graphqlCallTest(query)}>GraphQL</button>
			<CreatePost />
			{/* {arr.map((item) => (
				<Post key={item} />
			))} */}
		</SocialWindowStyle>
	);
};

const SocialWindowStyle = styled.div`
	.wrapper {
		border: solid 1px blue;
	}
`;

export default SocialWindow;
