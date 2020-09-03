import React from "react";
import "./css/PostItself.css";
import { useHistory } from "react-router-dom";
import moment from "moment";
import BoxLike from "./BoxLike";
import Comment from "./Comment";
import PopUpMenu from "./PopUpMenu";
import myContext from "../../../context/account/myContext";
import postContext from "../../../context/post/postContext";
import TextArea from "./TextArea";
import graphqlFetch from "../../../functions/graphqlFetch";
import PulsatingCircle from "../PulsatingCircle";
import { Scrollbars } from "react-custom-scrollbars";
import { Twemoji } from "react-emoji-render";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRibbon } from "@fortawesome/free-solid-svg-icons";

const PostItself = (props) => {
	// 💩
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);
	const [textContent, setTextContent] = React.useState(props.textContent);
	const [textContentPrev, setTextContentPrev] = React.useState(
		props.textContent
	);
	const [editMode, setEditMode] = React.useState(0);
	const [commentText, setCommentText] = React.useState("");
	const history = useHistory();
	// console.log(commentText);
	const [isCommentsBarOpen, setIsCommentsBarOpen] = React.useState(false);
	const [isCommentTextFocus, setIsCommentTextFocus] = React.useState(0);
	const [shouldContinueReading, setShouldContinueReading] = React.useState(0);
	const [isContinueReading, setIsContinueReading] = React.useState(0);

	const myRef = React.useRef();
	const postTextRef = React.useRef();

	React.useEffect(() => {
		if (postTextRef.current.offsetHeight === 500) {
			setShouldContinueReading(1);
		} else setShouldContinueReading(0);
	}, [contextPost]);

	React.useEffect(() => {
		myRef.current.scrollToBottom();
	}, []);

	const trigDel = () => {
		contextPost.delPost({ index: props.index, _id: props._id });
	};

	const trigEdit = () => {
		setEditMode(1);
		setTextContentPrev(textContent);
	};
	const trigEditSave = () => {
		const query = `editPost(_id: "${props._id}", textContent: """${textContent}""")`;
		graphqlFetch(query, (res) => {
			// console.log(res);
			contextPost.editPost({ time: res.editPost, index: props.index });
		});
		setEditMode(0);
	};
	const trigEditDiscard = () => {
		setEditMode(0);
		setTextContent(textContentPrev);
	};

	// const testRef = (e) => {
	// 	console.log(myRef.current.viewScrollTop);
	// };
	// console.log(props);

	// console.log(contextPost.state.posts[props.index]);

	const openComments = () => {
		setIsCommentsBarOpen(!isCommentsBarOpen);
	};

	return (
		<div className='post-body'>
			<div className='top-section'>
				<div className='profile-img'>
					<img
						onClick={() => history.push(`/app/users/${props.userName}`)}
						src={`data:${props.imgsmall.contentType};base64,${props.imgsmall.data}`}
						alt={""}
					/>
				</div>
				<div className='post-info-top'>
					<div className='user-titles'>
						<span
							onClick={() => history.push(`/app/users/${props.userName}`)}
							className='name'>
							{props.userName}
						</span>
						{props.isVerified && (
							<div className='ribon-round'>
								<FontAwesomeIcon
									icon={faRibbon}
									style={{ fontSize: "12px" }}
									color='orange'
								/>
							</div>
						)}
						<PulsatingCircle
							className='PulsatingCircle'
							isOnline={props.isOnline}
						/>
					</div>
					<div className='date-posted'>
						{moment(parseInt(props.timestamp)).fromNow()}
					</div>
					{props.isOnline}
				</div>
				{props.userName === context.accountState.user && (
					<PopUpMenu
						trigDel={trigDel}
						trigEdit={trigEdit}
						trigEditSave={trigEditSave}
						trigEditDiscard={trigEditDiscard}
					/>
				)}
				<div className='bottom-grad'></div>
			</div>
			<div className='middle-section'>
				<div className='text-box'>
					{editMode ? (
						<TextArea
							value={textContent}
							minRows={1}
							setText={(txt) => setTextContent(txt)}
							iconDisplay={false}
							emojiDisplay={true}
						/>
					) : (
						<React.Fragment>
							<div
								className='post-text'
								ref={postTextRef}
								style={{ maxHeight: isContinueReading ? "100%" : "500px" }}>
								<p className='textas'>
									<Twemoji text={textContent} />
								</p>
							</div>
							{shouldContinueReading && !isContinueReading ? (
								<div className='continue'>
									<span onClick={() => setIsContinueReading(1)}>
										Continue reading
									</span>
								</div>
							) : null}
						</React.Fragment>
					)}
				</div>
				<div className='comments-and-likes'>
					{props.edited && (
						<p className='modified'>
							Edited{" "}
							{moment(
								parseInt(contextPost.state.posts[props.index].edited)
							).fromNow()}
						</p>
					)}
					{contextPost.state.posts[props.index].comments.length ? (
						<div onClick={openComments} className='comments-info'>
							{/* <FontAwesomeIcon
								icon={faCommentAlt}
								style={{ fontSize: "22px" }}
								color='rgb(114, 170, 98)'
							/> */}
							<i
								className='fas fa-comment-alt'
								style={{ fontSize: "22px" }}></i>
							<span style={{ color: "gray" }}>
								{contextPost.state.posts[props.index].comments.length}
							</span>
						</div>
					) : null}
					<BoxLike index={props.index} />
				</div>
			</div>

			<div className='bottom-section'>
				<div className='comments-content'>
					{contextPost.state.posts[props.index].comments.length !== 0 && (
						<div className='comments-content-top-grad'></div>
					)}
					<Scrollbars
						className='scroll-bar'
						// style={{ transition: "0.3s" }}
						ref={myRef}
						// onClick={() => console.log(myRef)}
						autoHeight
						autoHeightMin={0}
						autoHeightMax={isCommentsBarOpen ? 700 : 300}
						autoHide
						autoHideTimeout={2000}
						autoHideDuration={200}
						thumbMinSize={3}
						universal={true}>
						{contextPost.state.posts
							? contextPost.state.posts[props.index].comments.map(
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
							  )
							: null}
					</Scrollbars>
				</div>

				<div
					className={`add-post-comment ${
						isCommentTextFocus && "add-post-comment-focus"
					}`}>
					<TextArea
						className='add-post-comment-textarea'
						iconClick={() => {
							contextPost.sendComment(
								{
									post: { _id: props._id, index: props.index },
									user: context.accountState.user,
									comment: commentText,
								},
								() => myRef.current.scrollToBottom()
							);
							setCommentText("");
						}}
						style={{ padding: "5px 10px" }}
						placeholder='Comment..'
						value={commentText}
						minRows={1}
						setText={(txt) => setCommentText(txt)}
						iconDisplay={true}
						emojiDisplay={true}
						iconName='comment'
						focus={() => setIsCommentTextFocus(1)}
						blur={() => setIsCommentTextFocus(0)}
					/>
				</div>
			</div>
		</div>
	);
};

export default PostItself;
