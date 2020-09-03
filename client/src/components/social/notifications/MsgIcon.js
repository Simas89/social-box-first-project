import React from "react";
import "./css/MsgIcon.css";
import socialContext from "../../../context/social/socialContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const MsgIcon = () => {
	const contextSocial = React.useContext(socialContext);

	const handleClick = () => {
		if (contextSocial.isNotificationOpen) {
			contextSocial.notificationBarOff();
			contextSocial.notificationsPaginationSet(1);
		} else {
			contextSocial.notificationsPull({ action: "REFRESH" });
			contextSocial.notificationBarOn();
		}
	};

	// console.log(contextSocial);

	return (
		<div className='msg-icon' onClick={handleClick}>
			<div
				className={`${
					contextSocial.notificationUnread ? "counter " : "counter"
				}`}>
				<div>0</div>
			</div>
			<div className='ntf-news-icon'>
				<FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "22px" }} />
			</div>
		</div>
	);
};

export default MsgIcon;
