import React from "react";
import "./css/Chat.css";
import TextareaAutosize from "react-textarea-autosize";
import chatContext from "../../../context/chat/chatContext";
import myContext from "../../../context/account/myContext";
import { gql } from "@apollo/client";
import Msg from "./Msg";
import { Scrollbars } from "react-custom-scrollbars";

const Chat = (props) => {
	const contextChat = React.useContext(chatContext);
	const context = React.useContext(myContext);
	const myRef = React.useRef(null);
	React.useEffect(() => {
		myRef.current.view.scroll({
			top: 1000000,
			left: 0,
			behavior: "smooth",
		}); // eslint-disable-next-line
	}, [contextChat.state.targets[props.index].msgData]);

	const sendAMessage = (index) => {
		contextChat.apollo.mutate({
			mutation: gql`mutation {
				postMessage(userName: "${context.accountState.user}",target: "${
				contextChat.state.targets[index].name
			}",  content: """${contextChat.state.targets[props.index].input}""")
			}`,
		});
		// contextChat.setMsgInput({
		// 	value: "",
		// 	index: index,
		// });
	};

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
			<div className='middle'>
				<Scrollbars
					className='scroll-bar'
					ref={myRef}
					style={{ behavior: "smooth" }}
					autoHide
					autoHideTimeout={2000}
					autoHideDuration={200}
					thumbMinSize={3}
					universal={true}>
					<div className='middle-content'>
						{contextChat.state.targets.length &&
							contextChat.state.targets[props.index].msgData.map((msg) => {
								return (
									<Msg
										key={msg.id}
										content={msg.content}
										own={msg.user === context.accountState.user}
									/>
								);
							})}
					</div>
				</Scrollbars>
			</div>
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
					<div className='send' onClick={() => sendAMessage(props.index)}>
						<span>SEND</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
