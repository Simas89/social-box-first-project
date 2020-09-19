import React from "react";
import "./css/Chat.css";
import TextareaAutosize from "react-textarea-autosize";
import chatContext from "../../../context/chat/chatContext";
import myContext from "../../../context/account/myContext";
import { gql } from "@apollo/client";
import Msg from "./Msg";
import { Scrollbars } from "react-custom-scrollbars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const Chat = (props) => {
	const contextChat = React.useContext(chatContext);
	const [msgOpacity, setMsgOpacity] = React.useState(0);
	const [focus, setFocus] = React.useState(false);
	const context = React.useContext(myContext);
	const myRef = React.useRef(null);
	const history = useHistory();

	React.useEffect(() => {
		if (contextChat.state.targets[props.index].canScroll) {
			myRef.current.view.scroll({
				top: 1000000,
				left: 0,
				behavior: "smooth",
			});
		} // eslint-disable-next-line
		else {
			myRef.current.scrollToBottom();
		} // eslint-disable-next-line
	}, [contextChat.state.targets[props.index].msgData]);

	React.useEffect(() => {
		setMsgOpacity(contextChat.state.targets[props.index].canScroll);
		// eslint-disable-next-line
	}, [contextChat.state.targets[props.index].canScroll]);

	React.useEffect(() => {
		if (contextChat.state.targets[props.index].input) {
			updateIsTyping(true);
		} else {
			updateIsTyping(false);
		} // eslint-disable-next-line
	}, [contextChat.state.targets[props.index].input]);

	const updateIsTyping = (set) => {
		contextChat.apollo.mutate({
			mutation: gql`mutation {
				updateIsTyping(userName: "${context.accountState.user}",target: "${
				contextChat.state.targets[props.index].name
			}",  set: ${set})
			}`,
		});
	};

	const sendAMessage = (index) => {
		contextChat.apollo.mutate({
			mutation: gql`mutation {
				postMessage(userName: "${context.accountState.user}",target: "${
				contextChat.state.targets[index].name
			}",  content: """${contextChat.state.targets[props.index].input}""")
			}`,
		});
		updateIsTyping(false);
		contextChat.setMsgInput({
			value: "",
			index: index,
		});
	};

	const isClose = (index) => {
		let valuePrev = null;
		let valueNext = null;
		let userPrev = null;
		let userNext = null;

		try {
			valuePrev =
				contextChat.state.targets[props.index].msgData[index - 1].date;
			userPrev = contextChat.state.targets[props.index].msgData[index - 1].user;
		} catch (error) {}
		try {
			valueNext =
				contextChat.state.targets[props.index].msgData[index + 1].date;
			userNext = contextChat.state.targets[props.index].msgData[index + 1].user;
		} catch (error) {}

		const difPrev =
			contextChat.state.targets[props.index].msgData[index].date - valuePrev;

		const difNext =
			valueNext - contextChat.state.targets[props.index].msgData[index].date;

		const result = {
			prev: Math.floor(difPrev / 1000),
			next: Math.floor(difNext / 1000),
			mePrev: userPrev === context.accountState.user,
			meNext: userNext === context.accountState.user,
		};

		return result;
	};
	const deleteMsg = (msgIndex) => {
		contextChat.apollo.mutate({
			mutation: gql`mutation {
				deleteMsg(index: "${msgIndex}", userName: "${
				context.accountState.user
			}", target: "${contextChat.state.targets[props.index].name}")
			}`,
		});
	};

	const setChatSeen = () => {
		try {
			if (
				contextChat.state.ntfs.new.includes(
					contextChat.state.targets[props.index].name
				)
			) {
				contextChat.markOneNotification(
					contextChat.state.targets[props.index].name
				);
			}
		} catch (error) {}
	};

	return (
		<div
			className={`chat-main ${
				!contextChat.state.targets[props.index].isWindowOpen &&
				"chat-main-min chat-main-min-mob"
			} ${contextChat.isMobile && "mobile"}`}>
			<div className='top'>
				<span
					className='target-name'
					onClick={() =>
						history.push(`/app/users/${props.userName}`)
					}>{`${props.userName}`}</span>
				{contextChat.state.ntfs.new.includes(props.userName) ? (
					<div className='unread-dot'></div>
				) : null}
				<div
					className='minimize'
					onClick={() => {
						contextChat.setChatWindowState({
							index: props.index,
							set: !contextChat.state.targets[props.index].isWindowOpen,
						});
						!contextChat.state.targets[props.index].isWindowOpen &&
							setChatSeen();
					}}>
					<FontAwesomeIcon
						className='icon'
						icon={
							contextChat.state.targets[props.index].isWindowOpen
								? faAngleDown
								: faAngleUp
						}
					/>
				</div>
				<div
					className='close'
					onClick={() => contextChat.removeTarget(props.index)}>
					<div className='plank plank-1'></div>
					<div className='plank plank-2'></div>
				</div>
			</div>
			<div className='middle' onClick={setChatSeen}>
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
							contextChat.state.targets[props.index].msgData.map(
								(msg, index) => {
									return (
										<Msg
											content={msg.content}
											own={msg.user === context.accountState.user}
											msgOpacity={msgOpacity}
											isClose={isClose(index)}
											key={msg.id}
											deleteMsg={() => deleteMsg(index)}
											isDeleted={msg.content === "DELETED_MSG" && true}
										/>
									);
								}
							)}
						<div className='typing'>
							{contextChat.state.targets[props.index].isTyping ? (
								<span>typing...</span>
							) : null}
						</div>
					</div>
				</Scrollbars>
			</div>
			<div className='bottom' onClick={setChatSeen}>
				<TextareaAutosize
					className={`txt-area-core ${focus && "focus"}`}
					placeholder='Message..'
					onFocus={() => setFocus(true)}
					onBlur={() => {
						setFocus(false);
						updateIsTyping(false);
					}}
					value={contextChat.state.targets[props.index].input}
					onChange={(e) => {
						contextChat.setMsgInput({
							value: e.target.value,
							index: props.index,
						});
					}}
				/>

				<div
					className='send'
					onClick={() =>
						contextChat.state.targets[props.index].input &&
						sendAMessage(props.index)
					}>
					<i
						className={`fas fa-paper-plane icon ${
							contextChat.state.targets[props.index].input && "ready-to-send"
						}`}></i>
					{/* <FontAwesomeIcon
							className={`icon ${
								contextChat.state.targets[props.index].input && "ready-to-send"
							}`}
							icon={faPaperPlane}
						/> */}
				</div>
			</div>
		</div>
	);
};

export default Chat;
