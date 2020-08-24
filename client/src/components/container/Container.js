import React from "react";
import { Route } from "react-router-dom";
import myContext from "../../context/account/myContext";
import socialContext from "../../context/social/socialContext";
import Account from "./Account";
import UserProfile from "./UserProfile";
import SocialWindow from "../social/SocialWindow";
import SinglePostContainer from "../social/post/SinglePostContainer";
import AllUsersPage from "./AllUsersPage";

function Container() {
	//CONTAINER
	const context = React.useContext(myContext);
	const contextSocial = React.useContext(socialContext);

	React.useEffect(
		() => contextSocial.notificationsPull({ action: "REFRESH" }),
		[context] // eslint-disable-line react-hooks/exhaustive-deps
	);

	return (
		<React.Fragment>
			<Route ///////////// SOCIAL PLACE
				exact
				path='/app'
				render={() => <SocialWindow />}
			/>
			<Route ////////////// USERS
				exact
				path='/app/users'
				render={() => <AllUsersPage />}
			/>
			<Route ///////////////// PROFILE
				path='/app/users/:userNameID'
				render={(props) => (
					<UserProfile userName={props.match.params.userNameID} />
				)}
			/>
			<Route ///////////////// SINGLE POST
				path='/app/post/:postID'
				render={(props) => (
					<SinglePostContainer postID={props.match.params.postID} />
				)}
			/>
			<Route ////////////// ACCOUNT
				path='/app/account'
				render={() => <Account />}
			/>
		</React.Fragment>
	);
}

export default Container;
