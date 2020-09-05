import React from "react";
import "./css/PresentMode.css";

const PresentMode = (props) => {
	return (
		<div className='present-mode'>
			<div className='close' onClick={props.presentModeClose}>
				<div className='plank plank-1'></div>
				<div className='plank plank-2'></div>
			</div>
			{props.underConstruction ? (
				<div className='under-construction'>
					<span>Under construction..</span>
				</div>
			) : null}
		</div>
	);
};

export default PresentMode;
