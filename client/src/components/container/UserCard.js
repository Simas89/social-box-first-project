import React from "react";
import "./css/UserCard.css";
import PulsatingCircle from "../social/PulsatingCircle";
import { useHistory } from "react-router-dom";
import addRemoveUser from "../../functions/addRemoveUser";

const UserCard = (props) => {
	const history = useHistory();

	const handleClick = () => {
		addRemoveUser(props.userName, props.isListed, (response) => {
			console.log(response);
			props.passedUpdateToRefreshContacts();
		});
	};
	return (
		<div className='user-card'>
			<div className='image-block'>
				<img
					alt=''
					src={`data:${props.imgMini.contentType};base64,${props.imgMini.data}`}></img>
			</div>
			<div className='info-block'>
				<div className='user-name'>
					<p onClick={() => history.push(`/container/users/${props.userName}`)}>
						{props.userName}
					</p>
					<div className='pulse-c'>
						<PulsatingCircle isOnline={props.isOnline} />
					</div>
				</div>
				<div className='user-icon'>
					<i
						onClick={handleClick}
						className={`fas ${
							props.isListed ? "fa-user-check" : "fa-user-plus"
						}`}></i>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
