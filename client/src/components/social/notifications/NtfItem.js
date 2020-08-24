import React from "react";
import "./css/NtfItem.css";
import moment from "moment";
import { Link } from "react-router-dom";
import socialContext from "../../../context/social/socialContext";
import postContext from "../../../context/post/postContext";
import myContext from "../../../context/account/myContext";

import graphqlFetch from "../../../functions/graphqlFetch";
import gqlGetPostsQuery from "../../../functions/gqlGetPostsQuery";

const NtfItem = (props) => {
	const contextSocial = React.useContext(socialContext);
	const contextPost = React.useContext(postContext);
	const context = React.useContext(myContext);

	const ntfContent = () => {
		if (props.messageBody.format === "SIMPLE_TEXT") {
			return <React.Fragment>{props.messageBody.text1}</React.Fragment>;
		}

		if (props.messageBody.format === "USERLINK_TEXT") {
			return (
				<React.Fragment>
					<strong>
						<Link to={`/app/users/${props.messageBody.link}`}>
							{props.messageBody.link}
						</Link>
					</strong>{" "}
					{props.messageBody.text1}
				</React.Fragment>
			);
		}

		if (props.messageBody.format === "POST_LIKE") {
			return (
				<React.Fragment>
					<strong>
						<Link to={`/app/users/${props.messageBody.link}`}>
							{props.messageBody.link}
						</Link>
					</strong>
					{" likes your "}
					<strong
						onClick={() => {
							getPosts(
								gqlGetPostsQuery(
									"SINGLE",
									context.accountState.user,
									props.messageBody.link2
								)
							);
						}}>
						<Link
							onClick={contextPost.resetPosts}
							to={`/app/post/${props.messageBody.link2}`}>
							{"post"}
						</Link>
					</strong>
				</React.Fragment>
			);
		}

		if (props.messageBody.format === "POST_COMMENT") {
			return (
				<React.Fragment>
					<strong>
						<Link to={`/app/users/${props.messageBody.link}`}>
							{props.messageBody.link}
						</Link>
					</strong>
					{" commented on your "}
					<strong
						onClick={() => {
							getPosts(
								gqlGetPostsQuery(
									"SINGLE",
									context.accountState.user,
									props.messageBody.link2
								)
							);
						}}>
						<Link
							onClick={() => {
								contextPost.resetPosts();
								contextSocial.notificationBarOff();
							}}
							to={`/app/post/${props.messageBody.link2}`}>
							{"post"}
						</Link>
					</strong>
				</React.Fragment>
			);
		}
	};

	const getPosts = (query) => {
		graphqlFetch(query, (res) => {
			contextPost.setPosts(res.getPosts);
		});
	};

	const delRef = React.useRef(null);

	const seenOne = (e) => {
		if (e.target !== delRef.current) {
			contextSocial.notificationsPull({ action: "SEEN_ONE" }, props.id);
		}
	};

	const deleteOne = (e) => {
		if (e.target === delRef.current) {
			contextSocial.notificationsPull({ action: "DELETE_ONE" }, props.id);
			contextSocial.notifications.length === 1 &&
				contextSocial.notificationBarOff();
		}
	};

	return (
		<div className='ntf-item' onClick={seenOne}>
			<img
				alt=''
				src={`data:${props.imgMini.mimetype};base64,${props.imgMini.data}`}
			/>

			<div className='middle'>
				<div className='main-text'>{ntfContent()}</div>
				<div className='under'>
					<p className='date'>{moment(props.timestamp).fromNow()}</p>
				</div>
			</div>
			<div className='last'>
				{!props.isSeen ? <i className='fas fa-exclamation'></i> : null}
				<p ref={delRef} className='delete' onClick={deleteOne}>
					delete
				</p>
			</div>
		</div>
	);
};

export default NtfItem;
