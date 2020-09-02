import React from "react";
import "./css/AllUsersPage.css";
import findUsersFetch from "../../functions/findUsersFetch";
import { useHistory } from "react-router-dom";
import { css } from "@emotion/core";
import { PulseLoader } from "react-spinners";

import UserCard from "./UserCard";
import useOutsideClick from "../../hooks/useOutsideClick";

const AllUsersPage = () => {
	const [usersState, setUsersState] = React.useState({
		list: [],
		inputValue: "",
		contactsOnly: false,
	});
	const [focus, setFocus] = React.useState(0);
	const [initialLoad, setInitialLoad] = React.useState(1);
	const history = useHistory();

	const searchRef = React.useRef();

	React.useEffect(() => {
		findUsersFetch(usersState.inputValue, usersState.contactsOnly, (data) => {
			setInitialLoad(0);
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
		focus &&
			findUsersFetch(
				usersState.inputValue,
				!usersState.contactsOnly,
				(data) => {
					setUsersState({
						list: data,
						inputValue: usersState.inputValue,
						contactsOnly: !usersState.contactsOnly,
					});
				}
			);
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

	useOutsideClick(searchRef, () => {
		setFocus(0);
	});
	const override = css`
		display: block;
		margin: 0 auto;
	`;

	return (
		<div className='users-page'>
			<div className='users-page-header'>
				<div
					className={`search-bar-wrap`}
					ref={searchRef}
					style={{ opacity: focus ? 1 : 0.5 }}>
					<div className='search-bar'>
						<input
							className={`search-input`}
							onChange={handleInputVal}
							onFocus={() => setFocus(1)}
							type='text'
							placeholder='Search users...'></input>
						<div
							className={`search-bar-grad ${
								focus && "search-bar-grad-width"
							}`}></div>
					</div>
					<div className={`check-div ${focus && "opacity-1"}`}>
						<input
							className={`checkbox ${focus && "hover"}`}
							onChange={handleSearchMyContactsOnly}
							type='checkbox'
							checked={usersState.contactsOnly}></input>
						<label
							className={` ${focus && "hover"}`}
							onClick={handleSearchMyContactsOnly}>
							My contacts only
						</label>
					</div>
				</div>
			</div>
			{initialLoad ? (
				<div className='sweet-loading'>
					<PulseLoader
						css={override}
						size={8}
						margin={5}
						color={"rgba(40, 94, 53,1)"}
					/>
				</div>
			) : (
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
								numberOfComments={element.numberOfComments}
								numberOfPosts={element.numberOfPosts}
								findUsersFetchCallback={findUsersFetchCallback}
								showOnline={element.settings.showOnline}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default AllUsersPage;
