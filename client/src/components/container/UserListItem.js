import React from "react";
import addRemoveUser from "../../functions/addRemoveUser";
import PulsatingCircle from "../social/PulsatingCircle";
import "./css/UserListItem.css";

function UserListItem(props) {
	const handleClick = () => {
		addRemoveUser(props.userName, props.isListed, (response) => {
			console.log(response);
			props.passedUpdateToRefreshContacts();
		});
	};
	const showUser = () => {
		props.showUser(props.userName);
	};
	return (
		<div className='user-list-item'>
			<img
				alt=''
				src={`data:${props.imgMini.contentType};base64,${props.imgMini.data}`}></img>
			{props.userName}
			<PulsatingCircle isOnline={props.isOnline} />

			<button onClick={handleClick}>{props.isListed ? "-" : "+"}</button>
			<button onClick={showUser}>info</button>
		</div>
	);
}

export default UserListItem;
