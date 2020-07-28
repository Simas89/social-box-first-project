import React from "react";
import "./css/PostItself.css";
import { Icon } from "semantic-ui-react";

const PostItself = () => {
	return (
		<div className='post-body'>
			<div className='top-section'>
				<div className='profile-img'></div>
				<div className='post-info-top'>
					<div className='user-name'>Username</div>
					<div className='date-posted'>Date posted</div>
					{/* <p>Date posted</p> */}
				</div>
			</div>
			<div className='middle-section'>Post content goes here</div>
			<div className='bottom-section'>
				<div className='box-like'>
					5
					<Icon name='like' size='large' />
				</div>
			</div>
		</div>
	);
};

export default PostItself;
