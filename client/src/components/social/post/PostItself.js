import React from "react";
import "./css/PostItself.css";
import moment from "moment";
import BoxLike from "./BoxLike";
// import myContext from "../../../context/account/myContext";
// import postContext from "../../../context/post/postContext";
// import graphqlCall from "../../../functions/graphqlCall";

const PostItself = (props) => {
	// const context = React.useContext(myContext);
	// const contextPost = React.useContext(postContext);
	// console.log("props: ", props.likedByMe);

	return (
		<div className='post-body'>
			<div className='top-section'>
				<div className='profile-img'>
					<img
						src={`data:${props.imgsmall.contentType};base64,${props.imgsmall.data}`}
						alt={""}
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
					<BoxLike index={props.index} />
				</div>
			</div>
		</div>
	);
};

export default PostItself;
