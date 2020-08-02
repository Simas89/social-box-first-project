import React from "react";
import "./css/PostItself.css";
import { Icon } from "semantic-ui-react";
import moment from "moment";
import BoxLike from "./BoxLike";
import myContext from "../../../context/account/myContext";
import postContext from "../../../context/post/postContext";
import graphqlCall from "../../../functions/graphqlCall";

const PostItself = (props) => {
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);
	const [likedByMe, setLikedByMe] = React.useState(props.likedByMe);
	const [likes, setLikes] = React.useState(props.likes);
	console.log("props: ", props.likedByMe);

	const onLikeClick = (user, id) => {
		if (!likedByMe) {
			const query = `
		likePost(userName: "${user}", id: "${id}")
			`;
			graphqlCall(query, (res) => {
				console.log(res.likePost);
				if (res.likePost) {
					setLikedByMe(true);
					setLikes(res.likePost);
				}
			});
		}
	};

	return (
		<div className='post-body'>
			<div className='top-section'>
				<div className='profile-img'>
					<img
						src={`data:${props.imgsmall.contentType};base64,${props.imgsmall.data}`}
					/>
				</div>
				<div className='post-info-top'>
					<div className='user-name'>{props.userName}</div>
					<div className='date-posted'>
						{moment(parseInt(props.timestamp)).fromNow()}
					</div>
				</div>
			</div>
			<div className='middle-section'>{props.textContent}</div>
			<div className='bottom-section'>
				<div className='box-like'>
					<BoxLike />
					{likes}
					<Icon
						onClick={() => onLikeClick(context.accountState.user, props._id)}
						name={likedByMe ? "star" : "star outline"}
						size='large'
					/>
				</div>
			</div>
		</div>
	);
};

export default PostItself;
