import React from "react";
import "./css/Comment.css";
import PopUpMenu from "./PopUpMenu";
import moment from "moment";
import myContext from "../../../context/account/myContext";
import postContext from "../../../context/post/postContext";

const Comment = (props) => {
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);
	// console.log(props);

	const trigDel = () => {
		contextPost.delComment({
			_id: props._id,
			index: props.index,
			postIndex: props.postIndex,
		});
	};

	const trigEdit = () => {
		console.log("trigEdit");
	};
	const trigEditSave = () => {
		console.log("trigEditSave");
	};
	const trigEditDiscard = () => {
		console.log("trigEditDiscard");
	};

	return (
		<div className='comment-body'>
			<div className='comment-top'>
				<div className='profile-img'>
					<img
						src={`data:${props.imgsmall.contentType};base64,${props.imgsmall.data}`}
						alt={""}
					/>
				</div>
				<div className='info'>
					<p>{props.userName}</p>
				</div>
				<div className='info'>
					<p>•</p>
				</div>

				<div className='info'>
					<p>{moment(parseInt(props.timestamp)).fromNow()}</p>
				</div>
				{props.edited && (
					<React.Fragment>
						<div className='info'>
							<p>•</p>
						</div>
						<div className='info'>
							<p>Edited {moment(parseInt(props.edited)).fromNow()}</p>
						</div>
					</React.Fragment>
				)}

				{props.userName === context.accountState.user && (
					<PopUpMenu
						trigDel={trigDel}
						trigEdit={trigEdit}
						trigEditSave={trigEditSave}
						trigEditDiscard={trigEditDiscard}
					/>
				)}
			</div>
			<div className='comment-middle'>{props.textContent}</div>
		</div>
	);
};

export default Comment;
