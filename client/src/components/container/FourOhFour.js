import React from "react";
import "./css/FourOhFour.css";

const FourOhFour = (props) => {
	return (
		<div className='four-oh-four'>
			<h1>{`404 Couldn't find this ${props.type}`}</h1>
			<h1>(╯°□°）╯︵ ┻━┻</h1>
		</div>
	);
};

export default FourOhFour;
