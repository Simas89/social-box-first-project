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

	useOutsideClick(bodyRef, () => {
		contextSocial.notificationBarOff();
	});

	const testRef = () => {
		// const scrollmax = 53 * contextSocial.notifications.length - 448;
		// console.log("current:", scrollRef.current.viewScrollTop);
		// console.log("scrollmax:", scrollmax);
		// console.log("SUM - ", scrollmax - scrollRef.current.viewScrollTop);
	};
	return (
		<React.Fragment>
			{contextSocial.notifications.length !== 0 && (
				<div className='ntf-panel' ref={bodyRef}>
					<div className='top-sec'>
						<span>Recent Activity</span>
						<div className='actions'>
							<div className='dots'>•••</div>
							<span
								className='seen'
								onClick={() =>
									contextSocial.notificationsPull({ action: "SEEN_ALL" })
								}>
								seen all
							</span>
							<span
								className='del'
								onClick={() =>
									contextSocial.notificationsPull({ action: "DELETE_ALL" })
								}>
								delete all
							</span>
						</div>
					</div>
					<div className='middle'>
						<Scrollbars
							ref={scrollRef}
							onScroll={testRef}
							// onClick={() => console.log(myRef)}
							autoHeight
							autoHeightMin={0}
							autoHeightMax={450}
							autoHide
							autoHideTimeout={2000}
							autoHideDuration={200}
							thumbMinSize={3}
							universal={true}>
							{contextSocial.notifications.map((item) => (
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
							))}
						</Scrollbars>
					</div>
					<div className='bottom'></div>
				</div>
			)}
		</React.Fragment>
	);
};

export default NtfPanel;
