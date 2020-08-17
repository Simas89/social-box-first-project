import React from "react";
import "./css/NtfPanel.css";
import { Scrollbars } from "react-custom-scrollbars";
import socialContext from "../../../context/social/socialContext";
import NtfItem from "./NtfItem";

const NtfPanel = () => {
	const contextSocial = React.useContext(socialContext);
	return (
		<div className='ntf-panel'>
			<div className='top-sec'>
				<span>Recent Activity</span>
			</div>
			<div className='middle'>
				<Scrollbars
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
	);
};

export default NtfPanel;
