import React from "react";
import "./css/PulsatingCircle.css";

const PulsatingCircle = (props) => {
	return <div className={`base ${props.isOnline && "online"}`}></div>;
};

export default PulsatingCircle;
