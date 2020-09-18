import React from "react";
import "./css/MsgIcon.css";
import chatContext from "../../../context/chat/chatContext";
import socialContext from "../../../context/social/socialContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const MsgIcon = () => {
	const contextChat = React.useContext(chatContext);
	const contextSocial = React.useContext(socialContext);

	const handleClick = () => {
		console.log(contextChat.state.isNtfOpen);
		contextChat.setNtfOpen(!contextChat.state.isNtfOpen);
		contextSocial.notificationBarOff();
	};

	return (
		<div className='msg-icon' onClick={handleClick}>
			<div className={`counter ${contextChat.state.ntfs.new && "red"}`}>
				<div>
					{contextChat.state.ntfs.new
						? contextChat.state.ntfs.new
						: contextChat.state.ntfs.old}
				</div>
			</div>
			<div className='ntf-news-icon'>
				<FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "22px" }} />
			</div>
		</div>
	);
};

export default MsgIcon;
