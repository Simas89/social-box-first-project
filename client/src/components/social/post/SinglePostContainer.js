import React from "react";
import myContext from "../../../context/account/myContext";
import postContext from "../../../context/post/postContext";
import PostItself from "../../social/post/PostItself";
import graphqlFetch from "../../../functions/graphqlFetch";
import gqlGetPostsQuery from "../../../functions/gqlGetPostsQuery";
import FourOhFour from "../../container/FourOhFour";
import { css } from "@emotion/core";
import { PulseLoader } from "react-spinners";

const SinglePostContainer = (props) => {
	const contextPost = React.useContext(postContext);
	const context = React.useContext(myContext);

	React.useEffect(() => {
		getPosts(
			gqlGetPostsQuery("SINGLE", context.accountState.user, props.postID)
		);
		//eslint-disable-next-line
	}, []);

	const getPosts = (query) => {
		graphqlFetch(query, (res) => {
			contextPost.setPosts(res.getPosts);
			contextPost.setIsLoading(0);
		});
	};

	const override = css`
		display: block;
		margin: 0 auto;
	`;

	return !contextPost.isLoading ? (
		contextPost.state.posts.length ? (
			<React.Fragment>
				{contextPost.state.posts.map((item, index) => (
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
			</React.Fragment>
		) : (
			<FourOhFour type='post' />
		)
	) : (
		<div className='sweet-loading'>
			<PulseLoader
				css={override}
				size={8}
				margin={5}
				color={"rgba(40, 94, 53,1)"}
			/>
		</div>
	);
};

export default SinglePostContainer;
