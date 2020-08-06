import React from "react";
import "./css/LikesBubble.css";
import { useHistory } from "react-router-dom";
import postContext from "../../../context/post/postContext";

const LikesBuble = (props) => {
	const contextPost = React.useContext(postContext);
	const history = useHistory();
	const handleClick = () => {
		console.log(props.userName);
		contextPost.resetPosts();
		history.push(`/container/users/${props.userName}`);
	};
	return (
		<div
			onClick={handleClick}
			className='div-style'
			style={{ zIndex: props.zIndex }}>
			<img
				className='image'
				src={`data:"image/jpeg";base64,${props.imgmicro}`}
				alt={""}></img>
		</div>
	);
};

export default LikesBuble;
