import React from "react";
import "./css/PostItself.css";
import { Icon, Image } from "semantic-ui-react";
import moment from "moment";

const PostItself = (props) => {
	console.log("props: ", props);
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
					{props.likes}
					<Icon name='like' size='large' />
				</div>
			</div>
		</div>
	);
};

export default PostItself;
