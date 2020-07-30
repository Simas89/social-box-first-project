import React from "react";
import "./css/PostBar.css";
import { Icon } from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";
import graphqlCall from "../../functions/graphqlCall";

const CreatePostBar = () => {
	const ref1 = React.useRef();
	const [drop, setDrop] = React.useState(false);
	const [isAbsolute, setIsAbsolute] = React.useState("absolute");
	const [dropHeight, setDropHeight] = React.useState(109);
	// console.log(drop);

	const classAbsoluteSet = async () => {
		const waitFor = (delay) =>
			new Promise((resolve) => setTimeout(resolve, delay));

		if (drop) {
			setIsAbsolute("absolute"); // set to absolute
		} else {
			await waitFor(200);
			setIsAbsolute(""); // change back to solid
		}
		setDropHeight(ref1.current.offsetHeight + 55);
	};

	///////////////////  GRAPH QL
	const postPost = () => {
		const query = `
		addPost(token: "${sessionStorage.getItem("token")}", textContent: "${
			ref1.current.value
		}")
			`;

		graphqlCall(query, (res) => console.log(res));
	};

	return (
		<div
			className={` ${drop ? " post-bar" : "post-bar"}`}
			style={drop ? { minHeight: dropHeight + "px" } : { minHeight: "25px" }}>
			<div className='puiblish-some-shit'>
				<p>Some title</p>
			</div>
			<Icon
				className='drop-icon'
				onClick={() => {
					setDrop(!drop);
					classAbsoluteSet();
				}}
				name={`${drop ? "angle up" : "angle down"}`}
				size='large'
			/>

			<div className={isAbsolute}>
				<TextareaAutosize ref={ref1} className='TextareaAutosize' minRows={3} />
				<button onClick={() => postPost()}>POST</button>
			</div>
		</div>
	);
};

export default CreatePostBar;
