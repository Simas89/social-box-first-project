import React from "react";
import "./css/PostItself.css";
import moment from "moment";
import BoxLike from "./BoxLike";
import Comment from "./Comment";
import PopUpMenu from "./PopUpMenu";
import { Icon } from "semantic-ui-react";
import myContext from "../../../context/account/myContext";
import postContext from "../../../context/post/postContext";
import TextareaAutosize from "react-textarea-autosize";
import graphqlFetch from "../../../functions/graphqlFetch";

import { Scrollbars } from "react-custom-scrollbars";

const PostItself = (props) => {
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);
	const [textContent, setTextContent] = React.useState(props.textContent);
	const [textContentPrev, setTextContentPrev] = React.useState(
		props.textContent
	);
	const [editMode, setEditMode] = React.useState(0);
	const [commentText, setCommentText] = React.useState("i am comment");

	const myRef = React.useRef();
	React.useEffect(() => myRef.current.scrollToBottom(), []);

	const trigDel = () => {
		console.log("trigDel");
	};
	const trigEdit = () => {
		setEditMode(1);
		setTextContentPrev(textContent);
	};
	const trigEditSave = () => {
		const query = `editPost(_id: "${props._id}", textContent: "${textContent}")`;
		graphqlFetch(query, (res) => {
			// console.log(res);
			contextPost.editPost({ time: res.editPost, index: props.index });
		});
		setEditMode(0);
	};
	const trigEditDiscard = () => {
		setEditMode(0);
		setTextContent(textContentPrev, { maxHeight: "100px" });
	};

	// const testRef = (e) => {
	// 	console.log(myRef.current.viewScrollTop);
	// };
	// console.log(props);

	// console.log(contextPost.state.posts[props.index]);

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
				{props.userName === context.accountState.user && (
					<PopUpMenu
						trigDel={trigDel}
						trigEdit={trigEdit}
						trigEditSave={trigEditSave}
						trigEditDiscard={trigEditDiscard}
					/>
				)}
			</div>
			<div className='middle-section'>
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
				<BoxLike index={props.index} />
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
				<div className='comments-content'>
					<Scrollbars
						ref={myRef}
						// onClick={() => console.log(myRef)}
						autoHeight
						autoHeightMin={0}
						autoHeightMax={250}
						autoHide
						autoHideTimeout={2000}
						autoHideDuration={200}
						thumbMinSize={3}
						universal={true}>
						{contextPost.state.posts &&
							contextPost.state.posts[props.index].comments.map(
								(comment, i) => {
									return (
										<Comment
											key={comment._id}
											_id={comment._id}
											index={i}
											postIndex={props.index}
											userName={comment.userName}
											textContent={comment.textContent}
											timestamp={comment.timestamp}
											edited={comment.edited}
											imgsmall={comment.imgsmall}
										/>
									);
								}
							)}
					</Scrollbars>
				</div>
				<div className='comments-add'>
					<TextareaAutosize
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
						placeholder={"Write a comment.."}
						className='TextareaAutosize-comment'
					/>
					<Icon
						onClick={() => {
							contextPost.sendComment({
								post: { _id: props._id, index: props.index },
								user: context.accountState.user,
								comment: commentText,
							});
							setCommentText("");
						}}
						className={`comment-send ${commentText && "comment-send-ready"}`}
						name='comment'
						size='large'
					/>
				</div>
			</div>
		</div>
	);
};

export default PostItself;
