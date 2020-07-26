import React from "react";
import { Route, useLocation, useHistory } from "react-router-dom";
import myContext from "../../context/account/myContext";
import socialContext from "../../context/social/socialContext";
import Item from "./Item";
import UserListItem from "./UserListItem";
import Account from "./Account";
import marketItemsDataFetch from "../../functions/marketItemsDataFetch";
import findUsersFetch from "../../functions/findUsersFetch";
import UserProfile from "./UserProfile";
import SocialWindow from "../social/SocialWindow";

function Container(props) {
	//CONTAINER
	const context = React.useContext(myContext);
	const contextSocial = React.useContext(socialContext);
	const location = useLocation();
	const history = useHistory();

	// MARKET
	const [marketState, setMarketState] = React.useState([]);
	// USERS
	const [usersState, setUsersState] = React.useState({
		list: [],
		inputValue: "",
		contactsOnly: false,
	});

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

	/////////// USERS
	const handleInputVal = (e) => {
		e.persist();
		findUsersFetch(e.target.value, usersState.contactsOnly, (data) => {
			setUsersState({
				list: data,
				inputValue: e.target.value,
				contactsOnly: usersState.contactsOnly,
			});
		});
	};
	const handleSearchMyContactsOnly = () => {
		findUsersFetch(usersState.inputValue, !usersState.contactsOnly, (data) => {
			setUsersState({
				list: data,
				inputValue: usersState.inputValue,
				contactsOnly: !usersState.contactsOnly,
			});
		});
	};
	const passedUpdateToRefreshContacts = React.useCallback(() => {
		//salmon
		findUsersFetch(usersState.inputValue, usersState.contactsOnly, (data) => {
			setUsersState({
				list: data,
				inputValue: usersState.inputValue,
				contactsOnly: usersState.contactsOnly,
			});
		});
	}, [usersState.contactsOnly, usersState.inputValue]);

	React.useEffect(() => {
		location.pathname === "/container/market" &&
			marketItemsDataFetch((data) => {
				setMarketState(data);
			});
		location.pathname === "/container/users" && passedUpdateToRefreshContacts();
	}, [location.pathname, passedUpdateToRefreshContacts]);

	React.useEffect(
		() => contextSocial.notificationsPull({ action: "REFRESH" }),
		[context] // eslint-disable-line react-hooks/exhaustive-deps
	);

	const showUser = (userName) => {
		history.push(`/container/users/${userName}`);
	};

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
				render={() => (
					<React.Fragment>
						<input
							onChange={handleInputVal}
							// value={usersState.inputValue}
							type='text'
							placeholder='Search Users'></input>
						<input
							onChange={handleSearchMyContactsOnly}
							type='checkbox'
							checked={usersState.contactsOnly}></input>
						<label>My contacts only</label>
						{usersState.list.map((element) => {
							return (
								<UserListItem
									key={element.id}
									showUser={showUser}
									userName={element.userName}
									verified={element.verified}
									isListed={element.isListed}
									isOnline={element.isOnline}
									imgMini={element.imgMini}
									passedUpdateToRefreshContacts={passedUpdateToRefreshContacts}
								/>
							);
						})}
					</React.Fragment>
				)}
			/>
			<Route ///////////////// PROFILE
				path='/container/users/:userNameID'
				render={(props) => (
					<UserProfile userName={props.match.params.userNameID} />
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
