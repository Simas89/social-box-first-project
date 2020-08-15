import React from "react";
import "./css/TextArea.css";
import TextareaAutosize from "react-textarea-autosize";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const TextArea = (props) => {
	const [isEmojiOn, setIsEmojiOn] = React.useState(false);
	const [focus, setFocus] = React.useState(false);
	const onEmojiChoose = (emoji) => {
		console.log(emoji);
		props.setText(props.value + emoji.native);
	};

	console.log("focus", focus);
	console.log("isEmojiOn", isEmojiOn);

	return (
		<React.Fragment>
			<div className='txt-block'>
				<TextareaAutosize
					style={props.style}
					className='TextArea'
					placeholder={props.placeholder}
					value={props.value}
					minRows={props.minRows}
					onChange={(e) => props.setText(e.target.value)}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>
				{props.emojiDisplay && (
					<i
						style={{ fontSize: "22px" }}
						onClick={() => setIsEmojiOn(!isEmojiOn)}
						className='far fa-laugh  icon-emoji'></i>
				)}

				{props.iconDisplay && (
					<i
						style={{ fontSize: "22px" }}
						className={`fas fa-paper-plane  icon-send ${
							props.value && "icon-send-ready"
						}`}
						onClick={() => {
							props.iconClick();
							setIsEmojiOn(false);
						}}></i>
				)}
			</div>
			<div style={{ position: "relative" }}>
				{isEmojiOn && (
					<Picker
						title='Pick your emoji…'
						emoji='point_up'
						emojiSize={20}
						set='twitter'
						// native={true}
						style={{ position: "absolute", top: "0", right: "0", zIndex: 1 }}
						onSelect={onEmojiChoose}
						showPreview={false}
					/>
				)}
			</div>
		</React.Fragment>
	);
};

export default TextArea;
