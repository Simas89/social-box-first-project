import React from "react";
import "./css/UserCard.css";
import PulsatingCircle from "../social/PulsatingCircle";
import { useHistory } from "react-router-dom";
import addRemoveUser from "../../functions/addRemoveUser";
import myContext from "../../context/account/myContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faRibbon,
	faComments,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";

const UserCard = (props) => {
	const history = useHistory();
	const context = React.useContext(myContext);
	// console.log(props);

	const handleClick = () => {
		addRemoveUser(props.userName, props.isListed, (response) => {
			console.log(response);
			props.findUsersFetchCallback();
		});
	};

	// {profileInfo.settings &&
	// 	profileInfo.settings.showOnline && (
	// 		<PulsatingCircle isOnline={profileInfo.isOnline} />
	// 	)}
	console.log(props);

	return (
		<div className='user-card'>
			<div className='image-block'>
				<img
					alt=''
					src={`data:${props.imgMini.contentType};base64,${props.imgMini.data}`}></img>
			</div>
			<div className='info-block'>
				<div className='user-name'>
					<p onClick={() => history.push(`/app/users/${props.userName}`)}>
						{props.userName}
					</p>
					{props.verified && (
						<FontAwesomeIcon
							icon={faRibbon}
							style={{ fontSize: "28px" }}
							color='orange'
						/>
					)}
					<div className='pulse-c'>
						{props.showOnline && <PulsatingCircle isOnline={props.isOnline} />}
					</div>
				</div>
				{props.userName !== context.accountState.user && (
					<div className='user-icon'>
						<i
							onClick={handleClick}
							className={`fas ${
								props.isListed
									? "fa-check cursor-pointer"
									: "fa-user-plus cursor-pointer"
							}`}></i>
					</div>
				)}
				<div className='stats'>
					<div className='stats-box'>
						<FontAwesomeIcon
							icon={faEdit}
							style={{ fontSize: "24px" }}
							color='black'
						/>
						<span>{props.numberOfPosts}</span>
					</div>
					<div className='stats-box'>
						<FontAwesomeIcon
							icon={faComments}
							style={{ fontSize: "24px" }}
							color='black'
						/>
						<span>{props.numberOfComments}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
