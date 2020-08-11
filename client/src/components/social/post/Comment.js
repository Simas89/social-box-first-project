import React from "react";
import "./css/Comment.css";

const Comment = () => {
	return (
		<div className='comment-body'>
			<div className='comment-top'>
				<div className='profile-img'></div>
				<div className='info'>
					<p>User</p>
				</div>
				<div className='info'>
					<p>•</p>
				</div>
				<div className='info'>
					<p>Date posted</p>
				</div>
			</div>
			<div className='comment-middle'>-Text content-</div>
		</div>
	);
};

export default Comment;
