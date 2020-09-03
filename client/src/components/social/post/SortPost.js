import React from "react";
import "./css/SortPost.css";
import postContext from "../../../context/post/postContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SortPost = (props) => {
	const contextPost = React.useContext(postContext);
	// console.log(contextPost.state.postSort[props.type]);

	const nameReturn = () => {
		return contextPost.state.postSort[props.type] ? "Relevant" : "Latest";
	};

	return (
		<div
			className='sort-post'
			onClick={() => contextPost.toggleSortMethod(props.type)}>
			<FontAwesomeIcon icon={faCaretDown} />
			<span>{nameReturn()}</span>
		</div>
	);
};

export default SortPost;
