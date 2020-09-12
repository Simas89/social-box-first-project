import React from "react";
import "./css/Msg.css";

const Msg = (props) => {
	return (
		<div className={`msg ${props.own ? "own" : "other"}`}>
			<span>{`${props.content}`}</span>
		</div>
	);
};

export default Msg;
