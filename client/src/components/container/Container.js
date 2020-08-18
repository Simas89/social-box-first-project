import React from "react";
import { Route, useLocation } from "react-router-dom";
import myContext from "../../context/account/myContext";
import socialContext from "../../context/social/socialContext";
import Item from "./Item";
import Account from "./Account";
import marketItemsDataFetch from "../../functions/marketItemsDataFetch";
import UserProfile from "./UserProfile";
import SocialWindow from "../social/SocialWindow";
import SinglePostContainer from "../social/post/SinglePostContainer";
import AllUsersPage from "./AllUsersPage";

function Container() {
	//CONTAINER
	const context = React.useContext(myContext);
	const contextSocial = React.useContext(socialContext);
	const location = useLocation();

	// MARKET
	const [marketState, setMarketState] = React.useState([]);

	const checkAmountInContainer = (element) => {
		let value = 0;
		try {
			value =
				context.accountState.items[
					context.accountState.items.findIndex(
						(iii) => iii.itemName === element.itemName
					)
				].amount;
		} finally {
			return value;
		}
	};

	React.useEffect(() => {
		location.pathname === "/container/market" &&
			marketItemsDataFetch((data) => {
				setMarketState(data);
			});
	}, [location.pathname]);

	React.useEffect(
		() => contextSocial.notificationsPull({ action: "REFRESH" }),
		[context] // eslint-disable-line react-hooks/exhaustive-deps
	);

	return (
		<React.Fragment>
			<Route ///////////// SOCIAL PLACE
				exact
				path='/container'
				render={() => <SocialWindow />}
			/>
			<Route ///////////// ITEMS
				path='/container/items'
				render={() => (
					<React.Fragment>
						<p>These are contents of your container</p>
						{context.accountState.items.map((element) => (
							<Item
								key={element.id}
								displayedAt={"ITEMS"}
								itemName={element.itemName}
								price={element.price}
								amount={element.amount}
							/>
						))}
					</React.Fragment>
				)}
			/>
			<Route ///////////// MARKET
				path='/container/market'
				render={() => (
					<React.Fragment>
						<p>Cr: {context.accountState.credits}</p>
						{marketState.map((element) => (
							<Item
								key={element.id}
								displayedAt={"MARKET"}
								pending={context.accountState.pending}
								credits={context.accountState.credits}
								itemName={element.itemName}
								price={element.price}
								amount={checkAmountInContainer(element)}
							/>
						))}
					</React.Fragment>
				)}
			/>

			<Route ////////////// USERS
				exact
				path='/container/users'
				render={() => <AllUsersPage />}
			/>
			<Route ///////////////// PROFILE
				path='/container/users/:userNameID'
				render={(props) => (
					<UserProfile userName={props.match.params.userNameID} />
				)}
			/>

			<Route ///////////////// SINGLE POST
				path='/container/post/:postID'
				render={(props) => (
					<SinglePostContainer postID={props.match.params.postID} />
				)}
			/>

			<Route ////////////// ACCOUNT
				path='/container/account'
				render={() => <Account />}
			/>
		</React.Fragment>
	);
}

export default Container;
