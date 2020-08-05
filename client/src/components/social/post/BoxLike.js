import React from "react";
import { Icon } from "semantic-ui-react";
import myContext from "../../../context/account/myContext";
import postContext from "../../../context/post/postContext";
import graphqlCall from "../../../functions/graphqlCall";

const BoxLike = (props) => {
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);

	const onLikeClick = (user, id) => {
		if (!contextPost.state.posts[props.index].likesPack.likedByMe) {
			const query = `
		likePost(userName: "${user}", id: "${id}"){
			likes
				likedByMe
				approves{
					userName
					imgmicro
				}
		}
			`;
			graphqlCall(query, (res) => {
				console.log(res);
				contextPost.updatePostLikes({
					likesPack: res.likePost,
					index: props.index,
				});
			});
		} else {
		}
	};

	return (
		<div>
			{contextPost.state.posts[props.index].likesPack.approves.map(
				(element) => {
					return element.userName;
				}
			)}
			{contextPost.state.posts[props.index].likesPack.likes}
			<Icon
				onClick={() =>
					onLikeClick(
						context.accountState.user,
						contextPost.state.posts[props.index]._id
					)
				}
				name={
					contextPost.state.posts[props.index].likesPack.likedByMe
						? "star"
						: "star outline"
				}
				size='large'
			/>
		</div>
	);
};

export default BoxLike;
