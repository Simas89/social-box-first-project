import React from "react";
import "./css/Form.css";

const Form = (props) => {
	return (
		<div className='form-wrapper'>
			{props.type === 1 ? "LOG IN" : "CONTACT"}
		</div>
	);
};

export default Form;
