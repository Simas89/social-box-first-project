import React from "react";
import "./css/Chat.css";
import TextareaAutosize from "react-textarea-autosize";
import chatContext from "../../../context/chat/chatContext";
import myContext from "../../../context/account/myContext";

const Chat = (props) => {
	const contextChat = React.useContext(chatContext);
	const context = React.useContext(myContext);
	return (
		<div className='chat-main'>
			<div className='top'>
				<span className='target-name'>{props.userName}</span>
				<div
					className='close'
					onClick={() => contextChat.removeTarget(props.index)}>
					<div className='plank plank-1'></div>
					<div className='plank plank-2'></div>
				</div>
			</div>
			<div className='middle'></div>
			<div className='bottom'>
				<TextareaAutosize
					className='txt-area-core'
					placeholder='Message..'
					value={contextChat.state.input}
					onChange={(e) => contextChat.setInput(e.target.value)}
				/>
				<div className='under-text-area'>
					<div className='send'>
						<span>SEND</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
