import React from "react";
import { Card, Feed, Icon, Pagination } from "semantic-ui-react";
import NotificationListItem from "./NotificationListItem";
import socialContext from "../../context/social/socialContext";

const NotificationsContentBlock = () => {
	const contextSocial = React.useContext(socialContext);

	return (
		<div>
			{contextSocial.notifications.length !== 0 && (
				<Card
					style={{
						position: "absolute",
						right: "450px",
						zIndex: "10",
						width: "400px",
					}}>
					<Card.Content>
						<Card.Header>Recent Activity</Card.Header>
					</Card.Content>
					<Card.Content>
						<Feed>
							{contextSocial.notifications.map((item) => (
								<NotificationListItem
									key={item._id}
									link={item.messageBody.link}
									text1={item.messageBody.text1}
									messageBody={item.messageBody}
									imgMini={item.imgMini}
									timestamp={item.timestamp}
									isSeen={item.isSeen}
									id={item._id}
								/>
							))}
						</Feed>
					</Card.Content>
					{contextSocial.notifications.length !== 0 && (
						<Card.Content>
							<div className='right aligned'>
								<Pagination
									className='centered aligned'
									onPageChange={(e, { activePage }) => {
										contextSocial.notificationsPaginationSet(activePage);
										contextSocial.notificationsPull(
											{
												action: "REFRESH",
											},
											undefined,
											activePage
										);
									}}
									boundaryRange={0}
									defaultActivePage={contextSocial.notificationPaginationPage}
									ellipsisItem={null}
									firstItem={null}
									lastItem={null}
									siblingRange={1}
									totalPages={contextSocial.notificationsLength}
								/>

								<Icon
									onClick={() =>
										contextSocial.notificationsPull({ action: "SEEN_ALL" })
									}
									name='check circle'
									size='large'
									floated='right'
									color='blue'
								/>
								<Icon
									onClick={() => {
										contextSocial.notificationBarOff();
										contextSocial.notificationsPaginationSet(1);
										contextSocial.notificationsPull({ action: "DELETE_ALL" });
									}}
									name='delete'
									size='large'
									floated='right'
									color='red'
								/>
							</div>
						</Card.Content>
					)}
				</Card>
			)}
		</div>
	);
};

export default NotificationsContentBlock;
