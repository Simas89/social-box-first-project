import React from "react";
import "./css/NtfNews.css";
import socialContext from "../../../context/social/socialContext";

const NtfNews = () => {
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

	console.log(contextSocial);

	return (
		<div className='ntf-news' onClick={handleClick}>
			<div
				className={`${
					contextSocial.notificationUnread ? "counter red" : "counter"
				}`}>
				<div>
					{contextSocial.notificationUnread
						? contextSocial.notificationUnread
						: contextSocial.notificationRead}
				</div>
			</div>
			<div className='ntf-news-icon'>
				<i className='fas fa-bell fa-2x'></i>
			</div>
		</div>
	);
};

export default NtfNews;
