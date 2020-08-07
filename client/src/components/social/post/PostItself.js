import React from "react";
import "./css/PostItself.css";
import moment from "moment";
import BoxLike from "./BoxLike";
import { Icon } from "semantic-ui-react";
import myContext from "../../../context/account/myContext";
import TextareaAutosize from "react-textarea-autosize";
// import postContext from "../../../context/post/postContext";
// import graphqlCall from "../../../functions/graphqlCall";

const PostItself = (props) => {
	const context = React.useContext(myContext);
	const [textContent, setTextContent] = React.useState(props.textContent);
	const [textContentPrev, setTextContentPrev] = React.useState(
		props.textContent
	);
	const [editMode, setEditMode] = React.useState(0);
	// const contextPost = React.useContext(postContext);
	// console.log("props: ", props);
	console.log(textContent);

	const editModeSET = (TYPE) => {
		console.log(TYPE);
		if (TYPE === "START") {
			setEditMode(1);
			setTextContentPrev(textContent);
		}
		if (TYPE === "CONFIRM") {
			setEditMode(0);
		}
		if (TYPE === "CANCEL") {
			setEditMode(0);
			setTextContent(textContentPrev);
		}
	};

	return (
		<div className='post-body'>
			<div className='top-section'>
				<div className='profile-img'>
					<img
						src={`data:${props.imgsmall.contentType};base64,${props.imgsmall.data}`}
						alt={""}
					/>
				</div>
				<div className='post-info-top'>
					<div className='user-name'>{props.userName}</div>
					<div className='date-posted'>
						{moment(parseInt(props.timestamp)).fromNow()}
					</div>
				</div>
			</div>
			<div className='middle-section'>
				{props.userName === context.accountState.user && (
					<React.Fragment>
						<Icon
							onClick={() =>
								editMode ? editModeSET("CONFIRM") : editModeSET("START")
							}
							className='edit-button'
							name={editMode ? "check" : "edit"}
							size='small'
						/>
						{editMode ? (
							<Icon
								onClick={() => editModeSET("CANCEL")}
								className='cancel-button'
								name='delete'
								size='small'
							/>
						) : null}
					</React.Fragment>
				)}
				{editMode ? (
					<TextareaAutosize
						onChange={(e) => setTextContent(e.target.value)}
						value={textContent}
						className='TextareaAutosize'
					/>
				) : (
					textContent
				)}
			</div>
			<p className='modified'>Edited at:</p>
			<div className='bottom-section'>
				<BoxLike index={props.index} />
			</div>
		</div>
	);
};

export default PostItself;
