import React from "react";
import "./css/Msg.css";

const Msg = (props) => {
	console.log(props.own);
	return (
		<div className={`msg ${props.own ? "own" : "other"}`}>
			<span>{props.content}</span>
		</div>
	);
};

export default Msg;
