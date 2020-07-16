import React from "react";
import { Link } from "react-router-dom";
import { Feed, Image, Icon } from "semantic-ui-react";
import socialContext from "../context/social/socialContext";
import moment from "moment";

const NotificationListItem = (props) => {
	const contextSocial = React.useContext(socialContext);

	const ntfContent = () => {
		if (props.messageBody.format === "USERLINK_TEXT") {
			return (
				<React.Fragment>
					<strong>
						<Link to={`/container/users/${props.messageBody.link}`}>
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
	};

	return (
		<Feed.Event style={{ height: "50px" }}>
			{props.messageBody.format === "USERLINK_TEXT" ? (
				<Link to={`/container/users/${props.messageBody.link}`}>
					<Image
						floated='left'
						size='mini'
						src={`data:${props.imgMini.mimetype};base64,${props.imgMini.data}`}
					/>
				</Link>
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
