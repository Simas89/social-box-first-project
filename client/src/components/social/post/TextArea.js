import React from "react";
import "./css/TextArea.css";
import TextareaAutosize from "react-textarea-autosize";

const TextArea = (props) => {
	return (
		<TextareaAutosize
			className='TextArea'
			placeholder={props.placeholder}
			value={props.value}
			minRows={props.minRows}
			onChange={(e) => props.setText(e.target.value)}
		/>
	);
};

export default TextArea;
