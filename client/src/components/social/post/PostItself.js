import React from "react";
import "./css/PostItself.css";
import moment from "moment";
import BoxLike from "./BoxLike";
import { Icon } from "semantic-ui-react";
import myContext from "../../../context/account/myContext";
import postContext from "../../../context/post/postContext";
import TextareaAutosize from "react-textarea-autosize";
import graphqlFetch from "../../../functions/graphqlFetch";

const PostItself = (props) => {
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);
	const [textContent, setTextContent] = React.useState(props.textContent);
	const [textContentPrev, setTextContentPrev] = React.useState(
		props.textContent
	);
	const [editMode, setEditMode] = React.useState(0);
	// console.log("post props:", props);

	const editModeSET = (TYPE) => {
		if (TYPE === "START") {
			setEditMode(1);
			setTextContentPrev(textContent);
		}
		if (TYPE === "CONFIRM") {
			const query = `editPost(_id: "${props._id}", textContent: "${textContent}")`;
			graphqlFetch(query, (res) => {
				// console.log(res);
				contextPost.editPost({ time: res.editPost, index: props.index });
			});
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
							size='large'
						/>
						{editMode ? (
							<Icon
								onClick={() => editModeSET("CANCEL")}
								className='cancel-button'
								name='delete'
								size='large'
							/>
						) : null}
					</React.Fragment>
				)}
				<div className='text-box'>
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
				{props.edited && (
					<p className='modified'>
						Edited{" "}
						{moment(
							parseInt(contextPost.state.posts[props.index].edited)
						).fromNow()}
					</p>
				)}
			</div>

			<div className='bottom-section'>
				<BoxLike index={props.index} />
			</div>
		</div>
	);
};

export default PostItself;
