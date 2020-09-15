import React from "react";
import "./css/Msg.css";
import { Twemoji } from "react-emoji-render";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Msg = (props) => {
	const [deleteStage, setDeleteStage] = React.useState(false);
	const msgRef = React.useRef(null);

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
	useOutsideClick(msgRef, () => {
		setDeleteStage(false);
	});

	return (
		<div className='msg-wrap' ref={msgRef}>
			<div
				className={`${mainClasses} ${cornerClasses} ${
					props.msgOpacity && "opacity1"
				} ${deleteStage ? "delete-stage" : "no-del-stage"}`}
				onClick={() => setDeleteStage(!deleteStage)}>
				<span>
					<Twemoji text={`${props.content}`} />
				</span>
				{props.own && deleteStage ? (
					<div className='delete' onClick={props.deleteMsg}>
						<FontAwesomeIcon className='delete-icon' icon={faTimesCircle} />
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Msg;
