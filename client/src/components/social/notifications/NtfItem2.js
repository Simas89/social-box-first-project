import React from "react";
import "./css/NtfItem.css";
import moment from "moment";
import { Twemoji } from "react-emoji-render";
import chatContext from "../../../context/chat/chatContext";

const NtfItem = (props) => {
	const contextChat = React.useContext(chatContext);

	const delRef = React.useRef(null);
	const seenRef = React.useRef(null);

	const trigDel = (e) => {
		contextChat.delOneNotification(props.id);
	};
	const trigMain = (e) => {
		if (e.target !== seenRef.current && e.target !== delRef.current) {
			contextChat.addTarget(props.user);
			contextChat.markOneNotification(props.user);
			contextChat.setNtfOpen(false);
		}
	};

	return (
		<div className={`ntf-item ${!props.seen && "unseen"}`}>
			<img
				alt=''
				src={`data:${props.imgsmall.contentType};base64,${props.imgsmall.data}`}
			/>

			<div className='middle' onClick={trigMain}>
				<div className='main-text'>
					<span className='ntf2-user-span'>{props.user}:</span>

					{<Twemoji className='ntf2-user-msgtext' text={props.lastMsg} />}
				</div>
				<div className='under'>
					<p className='date'>{moment(parseInt(props.date)).fromNow()}</p>
				</div>
			</div>
			<div className='last'>
				{!props.seen ? <i className='fas fa-exclamation '></i> : null}

				<i
					className='fas fa-times-circle delete-icon'
					ref={delRef}
					onClick={trigDel}></i>
			</div>
		</div>
	);
};

export default NtfItem;
