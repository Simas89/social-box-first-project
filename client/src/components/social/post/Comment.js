import React from "react";
import "./css/Comment.css";
import { useHistory } from "react-router-dom";
import PopUpMenu from "./PopUpMenu";
import moment from "moment";
import TextArea from "./TextArea";
import myContext from "../../../context/account/myContext";
import postContext from "../../../context/post/postContext";
import { Twemoji } from "react-emoji-render";

const Comment = (props) => {
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);
	const [textContent, setTextContent] = React.useState(props.textContent);
	const [textContentPrev, setTextContentPrev] = React.useState(
		props.textContent
	);
	const [editMode, setEditMode] = React.useState(false);
	const history = useHistory();
	// console.log(props);

	const trigDel = () => {
		contextPost.delComment({
			_id: props._id,
			index: props.index,
			postIndex: props.postIndex,
		});
	};

	const trigEdit = () => {
		setEditMode(true);
		setTextContentPrev(textContent);
	};
	const trigEditSave = () => {
		contextPost.editComment({
			_id: props._id,
			index: props.index,
			postIndex: props.postIndex,
			textContent: textContent,
		});
		setEditMode(false);
	};
	const trigEditDiscard = () => {
		setEditMode(false);
		setTextContent(textContentPrev);
	};

	return (
		<div className='comment-body'>
			<div className='comment-top'>
				<div className='profile-img'>
					<img
						src={`data:${props.imgsmall.contentType};base64,${props.imgsmall.data}`}
						alt={""}
					/>
				</div>
				<div className='info cursor-pointer'>
					<p onClick={() => history.push(`/app/users/${props.userName}`)}>
						{props.userName}
					</p>
				</div>
				<div className='info'>
					<p>•</p>
				</div>

				<div className='info'>
					<p>{moment(parseInt(props.timestamp)).fromNow()}</p>
				</div>
				{props.edited && (
					<React.Fragment>
						<div className='info'>
							<p>•</p>
						</div>
						<div className='info'>
							<p>Edited {moment(parseInt(props.edited)).fromNow()}</p>
						</div>
					</React.Fragment>
				)}

				{props.userName === context.accountState.user && (
					<PopUpMenu
						trigDel={trigDel}
						trigEdit={trigEdit}
						trigEditSave={trigEditSave}
						trigEditDiscard={trigEditDiscard}
					/>
				)}
			</div>
			<div className='comment-middle'>
				{editMode ? (
					<TextArea
						style={{ padding: "5px" }}
						value={textContent}
						minRows={1}
						setText={(txt) => setTextContent(txt)}
						iconDisplay={false}
						emojiDisplay={true}
					/>
				) : (
					<p>
						<Twemoji text={props.textContent} />
					</p>
				)}
			</div>
		</div>
	);
};

export default Comment;
