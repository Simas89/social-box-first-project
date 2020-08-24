import React from "react";
import "./css/AllUsersPage.css";
import findUsersFetch from "../../functions/findUsersFetch";
import { useHistory } from "react-router-dom";

import UserCard from "./UserCard";

const AllUsersPage = () => {
	const [usersState, setUsersState] = React.useState({
		list: [],
		inputValue: "",
		contactsOnly: false,
	});
	const history = useHistory();

	React.useEffect(() => {
		findUsersFetch(usersState.inputValue, usersState.contactsOnly, (data) => {
			setUsersState({
				list: data,
				inputValue: usersState.inputValue,
				contactsOnly: usersState.contactsOnly,
			});
		}); //eslint-disable-next-line
	}, []);

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
	const findUsersFetchCallback = React.useCallback(() => {
		//salmon
		findUsersFetch(usersState.inputValue, usersState.contactsOnly, (data) => {
			setUsersState({
				list: data,
				inputValue: usersState.inputValue,
				contactsOnly: usersState.contactsOnly,
			});
		}); //eslint-disable-next-line
	}, []);

	const showUser = (userName) => {
		history.push(`/app/users/${userName}`);
	};

	return (
		<div className='users-page'>
			<div className='users-page-header'>
				<input
					onChange={handleInputVal}
					type='text'
					placeholder='Search Users'></input>
				<input
					onChange={handleSearchMyContactsOnly}
					type='checkbox'
					checked={usersState.contactsOnly}></input>
				<label>My contacts only</label>
			</div>
			<div className='users-page-grid'>
				{usersState.list.map((element) => {
					return (
						<UserCard
							key={element.id}
							showUser={showUser}
							userName={element.userName}
							verified={element.verified}
							isListed={element.isListed}
							isOnline={element.isOnline}
							imgMini={element.imgMini}
							findUsersFetchCallback={findUsersFetchCallback}
							showOnline={element.settings.showOnline}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default AllUsersPage;
