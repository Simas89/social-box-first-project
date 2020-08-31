import React from "react";
import "./css/UserCard.css";
import PulsatingCircle from "../social/PulsatingCircle";
import { useHistory } from "react-router-dom";
import addRemoveUser from "../../functions/addRemoveUser";
import myContext from "../../context/account/myContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

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
	// console.log(props);

	return (
		<div className='user-card'>
			<div className='image-block'>
				<img
					alt=''
					src={`data:${props.imgMini.contentType};base64,${props.imgMini.data}`}></img>
			</div>
			<div className='info-block'>
				<div className='user-name'>
					{props.verified && <i className='fas fa-ribbon ribon'></i>}
					<p onClick={() => history.push(`/app/users/${props.userName}`)}>
						{props.userName}
					</p>

					<div className='pulse-c'>
						{props.showOnline && <PulsatingCircle isOnline={props.isOnline} />}
					</div>
				</div>
				{props.userName !== context.accountState.user && (
					<div className='user-icon'>
						{!props.isListed ? (
							<FontAwesomeIcon
								onClick={handleClick}
								className='cursor-pointer'
								icon={faUserPlus}
							/>
						) : (
							<span className='user-added'>USER ADDED</span>
						)}
					</div>
				)}
				<div className='stats'>
					<div className='top-line-grad'></div>
					<div className='stats-box'>
						<span className='top-span'>POSTS</span>
						<span className='bottom-span'>{props.numberOfPosts}</span>
					</div>
					<div className='stats-box'>
						<span className='top-span'>COMMENTS</span>
						<span className='bottom-span'>{props.numberOfComments}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
