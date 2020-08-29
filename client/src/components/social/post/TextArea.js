import React from "react";
import "./css/TextArea.css";
import TextareaAutosize from "react-textarea-autosize";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const TextArea = (props) => {
	const [isEmojiOn, setIsEmojiOn] = React.useState(false);
	const onEmojiChoose = (emoji) => {
		console.log(emoji);
		props.setText(props.value + emoji.native);
	};
	const ref = React.useRef(null);

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
						ref={ref}
						onClick={(e) => {
							console.log(ref);
							console.log(e.target);
						}}
						color='rgb(62, 134, 61)'
						title='Pick your emoji…'
						emoji='point_up'
						emojiSize={20}
						set='twitter'
						// native={true}
						style={{ position: "absolute", top: "0", right: "0", zIndex: 6 }}
						onSelect={onEmojiChoose}
						showPreview={false}
					/>
				)}
			</div>
		</React.Fragment>
	);
};

export default TextArea;
