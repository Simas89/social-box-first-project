import React from "react";
import "./css/NtfPanel.css";
import { Scrollbars } from "react-custom-scrollbars";
import NtfItem2 from "./NtfItem2";
import useOutsideClick from "../../../hooks/useOutsideClick";
import chatContext from "../../../context/chat/chatContext";

const Dropaz = () => {
	const contextChat = React.useContext(chatContext);
	const bodyRef = React.useRef(null);
	const scrollRef = React.useRef(null);
	const [autoHeightMax, setAutoHeightMax] = React.useState(0);

	const animatingHeightMax = () => {
		setTimeout(() => setAutoHeightMax(470), 1);
	};

	React.useEffect(() => animatingHeightMax(), []);

	useOutsideClick(bodyRef, () => {
		contextChat.setNtfOpen(false);
	});

	const testRef = () => {
		// const scrollmax = 53 * contextSocial.notifications.length - 448;
		// console.log("current:", scrollRef.current.viewScrollTop);
		// console.log("scrollmax:", scrollmax);
		// console.log("SUM - ", scrollmax - scrollRef.current.viewScrollTop);
	};
	const allDelete = () => {
		console.log("ALL DELETE CHAT");
		contextChat.delAllNotifications();
	};

	const allAsRead = () => {
		console.log("ALL AS READ CHAT");
	};
	return (
		<React.Fragment>
			<div
				className='ntf-panel'
				ref={bodyRef}
				style={{ maxHeight: autoHeightMax }}>
				<div className='top-sec'>
					<span>Recent Messages</span>
					{contextChat.state.chatsNtf.length ? (
						<div className='actions-box'>
							<span className='action-span' onClick={allAsRead}>
								Mark all as read
							</span>
							<span className='dot-span'>•</span>
							<span className='action-span' onClick={allDelete}>
								Delete all
							</span>
						</div>
					) : null}
				</div>
				<div className='middle'>
					<Scrollbars
						className='scroll-bar'
						// style={{ transition: "2.4s" }}
						ref={scrollRef}
						onScroll={testRef}
						// onClick={() => console.log(myRef)}
						autoHeight
						autoHeightMin={0}
						autoHeightMax={400}
						autoHide
						autoHideTimeout={2000}
						autoHideDuration={200}
						thumbMinSize={3}
						universal={true}>
						{contextChat.state.chatsNtf.length ? (
							contextChat.state.chatsNtf.map((element) => {
								return (
									<NtfItem2
										key={element._id}
										user={element.user}
										lastMsg={element.lastMsg}
										date={element.date}
										seen={element.seen}
										imgsmall={element.imgsmall}
									/>
								);
							})
						) : (
							<p className='empty'>Looks like nothing here..</p>
						)}
					</Scrollbars>
				</div>
				<div className='bottom'></div>
			</div>
		</React.Fragment>
	);
};

export default Dropaz;
