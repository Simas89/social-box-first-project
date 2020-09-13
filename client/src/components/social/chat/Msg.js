import React from "react";
import "./css/Msg.css";
import { Twemoji } from "react-emoji-render";

const Msg = (props) => {
	React.useEffect(() => {
		// console.log(props.isClose);
	}, []);
	let mainClasses;
	let cornerClasses;
	const calsClasses = () => {
		const sec = 15;
		mainClasses = `msg  ${props.own ? "own" : "other"} } ${
			props.isClose.next > sec && "margin-far"
		}`;
		cornerClasses = "";
		if (props.own) {
			cornerClasses = `${
				props.isClose.next < sec &&
				props.isClose.next >= 0 &&
				props.isClose.meNext &&
				"close-BR"
			} ${props.isClose.prev < sec && props.isClose.mePrev && "close-TR"}`;
		} else {
			cornerClasses = `${
				props.isClose.next < sec &&
				props.isClose.next >= 0 &&
				!props.isClose.meNext &&
				"close-BL"
			} ${props.isClose.prev < sec && !props.isClose.mePrev && "close-TL"}`;
		}
	};
	calsClasses();

	return (
		<div
			className={`${mainClasses} ${cornerClasses} ${
				props.msgOpacity && "opacity1"
			}`}>
			<span>
				<Twemoji text={`${props.content}`} />
			</span>
		</div>
	);
};

export default Msg;
