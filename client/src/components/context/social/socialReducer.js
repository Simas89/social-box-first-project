import {
	NOTIFICATIONS_TAB_ON,
	NOTIFICATIONS_TAB_OFF,
	NOTIFICATIONS_UPDATE,
	NOTIFICATIONS_PAG_PAGE_SET,
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case NOTIFICATIONS_TAB_ON: {
			return { ...state, isNotificationOpen: true };
		}
		case NOTIFICATIONS_TAB_OFF: {
			return { ...state, isNotificationOpen: false };
		}
		case NOTIFICATIONS_UPDATE: {
			return {
				...state,
				notifications: action.payload.list,
				notificationsLength: action.payload.length,
				notificationRead: action.payload.read,
				notificationUnread: action.payload.unRead,
			};
		}
		case NOTIFICATIONS_PAG_PAGE_SET: {
			return {
				...state,
				notificationPaginationPage: action.payload,
			};
		}

		default:
			return state;
	}
};
