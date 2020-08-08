import React from "react";
import "./css/PostItself.css";
import moment from "moment";
import BoxLike from "./BoxLike";
import { Icon } from "semantic-ui-react";
import myContext from "../../../context/account/myContext";
import postContext from "../../../context/post/postContext";
import TextareaAutosize from "react-textarea-autosize";
import graphqlFetch from "../../../functions/graphqlFetch";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { Scrollbars } from "react-custom-scrollbars";

const PostItself = (props) => {
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);
	const [textContent, setTextContent] = React.useState(props.textContent);
	const [textContentPrev, setTextContentPrev] = React.useState(
		props.textContent
	);
	const [editMode, setEditMode] = React.useState(0);
	const [commentText, setCommentText] = React.useState("");
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
			setTextContent(textContentPrev, { maxHeight: "100px" });
		}
	};
	//

	const myRef = React.useRef();

	React.useEffect(() => myRef.current.scrollToBottom(), []);

	// const container = myRef;
	// console.log(container);
	// const ps = new PerfectScrollbar(container);

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
						onClick={() => console.log(myRef)}
						autoHeight
						autoHeightMin={0}
						autoHeightMax={100}
						autoHide
						autoHideTimeout={2000}
						autoHideDuration={200}
						thumbMinSize={30}
						universal={true}>
						{""}Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
						luctus nulla non lorem feugiat dignissim. Nam vitae fringilla lorem.
						Mauris odio tortor, blandit sit amet mi nec, interdum consectetur
						magna. Quisque non sapien quis est bibendum hendrerit quis at
						libero. Suspendisse lacinia congue tellus ac volutpat. Curabitur
						imperdiet purus sed ante elementum porttitor. Nam sed vehicula
						libero. Vivamus id augue nec velit luctus auctor sit amet ac nisi.
						Class aptent taciti sociosqu ad litora torquent per conubia nostra,
						per inceptos himenaeos. Nullam mi sem, luctus sed magna eu, placerat
						efficitur dolor. Proin magna nisi, dapibus sed lorem eu, pretium
						iaculis massa. Ut vitae tristique lorem. Vestibulum sagittis lectus
						in massa ullamcorper lacinia. Aliquam vel erat sagittis, maximus
						felis sed, consequat turpis. Duis vitae rhoncus est, at iaculis
						velit. Proin malesuada consequat condimentum. Lorem ipsum dolor sit
						amet, consectetur adipiscing elit. In luctus nulla non lorem feugiat
						dignissim. Nam vitae fringilla lorem. Mauris odio tortor, blandit
						sit amet mi nec, interdum consectetur magna. Quisque non sapien quis
						est bibendum hendrerit quis at libero. Suspendisse lacinia congue
						tellus ac volutpat. Curabitur imperdiet purus sed ante elementum
						porttitor. Nam sed vehicula libero. Vivamus id augue nec velit
						luctus auctor sit amet ac nisi. Class aptent taciti sociosqu ad
						litora torquent per conubia nostra, per inceptos himenaeos. Nullam
						mi sem, luctus sed magna eu, placerat efficitur dolor. Proin magna
						nisi, dapibus sed lorem eu, pretium iaculis massa. Ut vitae
						tristique lorem. Vestibulum sagittis lectus in massa ullamcorper
						lacinia. Aliquam vel erat sagittis, maximus felis sed, consequat
						turpis. Duis vitae rhoncus est, at iaculis velit. Proin malesuada
						consequat condimentum.........
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
