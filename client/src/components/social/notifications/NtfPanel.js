import React from "react";
import "./css/NtfPanel.css";
import { Scrollbars } from "react-custom-scrollbars";
import socialContext from "../../../context/social/socialContext";
import NtfItem from "./NtfItem";
import useOutsideClick from "../../../hooks/useOutsideClick";

const NtfPanel = () => {
	const bodyRef = React.useRef(null);
	const scrollRef = React.useRef(null);
	const contextSocial = React.useContext(socialContext);
	const [autoHeightMax, setAutoHeightMax] = React.useState(0);

	const animatingHeightMax = () => {
		setTimeout(() => setAutoHeightMax(470), 1);
	};

	React.useEffect(() => animatingHeightMax(), []);

	useOutsideClick(bodyRef, () => {
		contextSocial.notificationBarOff();
		console.log("Click outside Ntf");
	});
	console.log(bodyRef);

	const testRef = () => {
		// const scrollmax = 53 * contextSocial.notifications.length - 448;
		// console.log("current:", scrollRef.current.viewScrollTop);
		// console.log("scrollmax:", scrollmax);
		// console.log("SUM - ", scrollmax - scrollRef.current.viewScrollTop);
	};
	return (
		<React.Fragment>
			<div
				className='ntf-panel'
				ref={bodyRef}
				style={{ maxHeight: autoHeightMax }}>
				<div className='top-sec'>
					<span>Notifications</span>
					{contextSocial.notifications.length ? (
						<div className='actions-box'>
							<span
								className='action-span'
								onClick={() =>
									contextSocial.notificationsPull({ action: "SEEN_ALL" })
								}>
								Mark all as read
							</span>
							<span className='dot-span'>•</span>
							<span
								className='action-span'
								onClick={() =>
									contextSocial.notificationsPull({ action: "DELETE_ALL" })
								}>
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
						{contextSocial.notifications.length ? (
							contextSocial.notifications.map((item) => (
								<NtfItem
									key={item._id}
									link={item.messageBody.link}
									text1={item.messageBody.text1}
									messageBody={item.messageBody}
									imgMini={item.imgMini}
									timestamp={item.timestamp}
									isSeen={item.isSeen}
									id={item._id}
								/>
							))
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

export default NtfPanel;
