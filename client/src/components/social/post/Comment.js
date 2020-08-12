import React from "react";
import "./css/Comment.css";

import moment from "moment";
import myContext from "../../../context/account/myContext";

const Comment = (props) => {
	const context = React.useContext(myContext);
	// console.log(props);
	const openMenu = () => {
		console.log("openMenu");
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
					<div onClick={openMenu} className='menu'>
						<p>•••</p>
					</div>
				)}
			</div>
			<div className='comment-middle'>{props.textContent}</div>
		</div>
	);
};

export default Comment;
