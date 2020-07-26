import React from "react";
import { Icon, Label, Menu } from "semantic-ui-react";
import socialContext from "../../context/social/socialContext";

const NotificationTab = () => {
	const contextSocial = React.useContext(socialContext);

	// let newNotifications = 0;
	// contextSocial.notifications.forEach((item) => {
	// 	item.isSeen === false && newNotifications++;
	// });

	return (
		<Menu
			onClick={() => {
				contextSocial.notificationsPull({ action: "REFRESH" });
				if (contextSocial.isNotificationOpen) {
					contextSocial.notificationBarOff();
					contextSocial.notificationsPaginationSet(1);
				} else contextSocial.notificationBarOn();
			}}
			compact
			style={{
				position: "absolute",
				right: "2vw",
				top: "-20px",
				zIndex: "11",
			}}>
			<Menu.Item
				as='a'
				style={{
					padding: "10px 5px 10px 10px",
				}}>
				<Icon name='bell' size='large' />
				{contextSocial.notificationUnread !== 0 ? (
					<Label color='red' floating>
						{contextSocial.notificationUnread}
					</Label>
				) : (
					<Label color='grey' floating>
						{contextSocial.notificationRead}
					</Label>
				)}
			</Menu.Item>
		</Menu>
	);
};

export default NotificationTab;
