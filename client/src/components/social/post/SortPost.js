import React from "react";
import "./css/SortPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SortPost = () => {
	return (
		<div className='sort-post'>
			<FontAwesomeIcon icon={faCaretDown} />
			<span>Latest</span>
		</div>
	);
};

export default SortPost;
