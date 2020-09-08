import React from "react";
import "./css/Chat.css";
import TextareaAutosize from "react-textarea-autosize";
import chatContext from "../../../context/chat/chatContext";
import myContext from "../../../context/account/myContext";

const Chat = (props) => {
	React.useEffect(() => {
		contextChat.socket.on("reply", (msg) => console.log(msg));
	}, []);

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
					value={contextChat.state.targets[props.index].input}
					onChange={(e) => {
						contextChat.setMsgInput({
							value: e.target.value,
							index: props.index,
						});
					}}
				/>
				<div className='under-text-area'>
					<div
						className='send'
						onClick={() => {
							// socket.emit("chat", "hjgscjhgbsjshbcjcshbjhvscjhsbjhvcbjhsb");
							contextChat.sendAMessage({
								index: props.index,
								sender: context.accountState.user,
							});
						}}>
						<span>SEND</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
