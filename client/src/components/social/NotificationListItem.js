import React from "react";
import { Link } from "react-router-dom";
import { Feed, Image, Icon } from "semantic-ui-react";
import socialContext from "../../context/social/socialContext";
import postContext from "../../context/post/postContext";
import myContext from "../../context/account/myContext";

import moment from "moment";

import graphqlFetch from "../../functions/graphqlFetch";
import gqlGetPostsQuery from "../../functions/gqlGetPostsQuery";

const NotificationListItem = (props) => {
	const contextSocial = React.useContext(socialContext);
	const contextPost = React.useContext(postContext);
	const context = React.useContext(myContext);

	const ntfContent = () => {
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
		if (props.messageBody.format === "SIMPLE_TEXT") {
			return <React.Fragment>{props.messageBody.text1}</React.Fragment>;
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
			// console.log(res);
		});
	};

	return (
		<Feed.Event style={{ height: "50px" }}>
			{props.messageBody.format === "USERLINK_TEXT" ? (
				<Link to={`/app/users/${props.messageBody.link}`}></Link>
			) : (
				<Image
					floated='left'
					size='mini'
					src={`data:${props.imgMini.mimetype};base64,${props.imgMini.data}`}
				/>
			)}
			<Feed.Content
				onClick={() =>
					contextSocial.notificationsPull({ action: "SEEN_ONE" }, props.id)
				}>
				<Feed.Date content={moment(props.timestamp).fromNow()} />
				<p>{ntfContent()}</p>
			</Feed.Content>
			{!props.isSeen ? (
				<Icon
					onClick={() =>
						contextSocial.notificationsPull({ action: "SEEN_ONE" }, props.id)
					}
					name='check circle outline'
					size='large'
					floated='right'
					color='grey'
				/>
			) : (
				<Icon name='check circle' size='large' floated='right' color='blue' />
			)}

			<Icon
				onClick={() => {
					contextSocial.notificationsPull({ action: "DELETE_ONE" }, props.id);
					contextSocial.notifications.length === 1 &&
						contextSocial.notificationBarOff();
				}}
				name='delete'
				size='large'
				floated='right'
				color='grey'
			/>
		</Feed.Event>
	);
};

export default NotificationListItem;
