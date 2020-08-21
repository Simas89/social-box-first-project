import React from "react";
import { useHistory } from "react-router-dom";
import tradeFetch from "../../functions/tradeFetch";
import myContext from "./myContext";
import logout from "../../functions/logOutFetch";

const ContextState = (props) => {
	const [accountState, setAccountState] = React.useState({
		logged: false,
		user: "",
		credits: 0,
		items: [],
		pending: false,
		email: "",
		verified: false,
		dateJoined: Date,
		profilePic: { base64: null, mimetype: "" },
		settings: { showOnline: true },
	});

	const history = useHistory();
	React.useEffect(() => {
		const data = JSON.parse(sessionStorage.getItem("MY_CONTAINER_STATE"));
		if (data) {
			setAccountState(data);
		} else {
			history.push("/");
		}
	}, [history]);

	const setAccountStateALL = (
		logged = accountState.logged,
		user = accountState.user,
		credits = accountState.credits,
		items = accountState.items,
		pending = accountState.pending,
		email = accountState.email,
		verified = accountState.verified,
		dateJoined = accountState.dateJoined,
		profilePic = accountState.profilePic,
		settings = accountState.settings
	) => {
		let cloneState = { ...accountState };
		cloneState.logged = logged;
		cloneState.user = user;
		cloneState.credits = credits;
		cloneState.items = items;
		cloneState.pending = pending;
		cloneState.email = email;
		cloneState.verified = verified;
		cloneState.dateJoined = dateJoined;
		cloneState.profilePic = profilePic;
		cloneState.settings = settings;
		sessionStorage.setItem("MY_CONTAINER_STATE", JSON.stringify(cloneState));
		setAccountState(cloneState);
	};
	const logIn = (data) => {
		console.log(data);
		// console.log(data);
		data.rememberMe
			? localStorage.setItem("rememberme", data.token)
			: localStorage.clear();
		sessionStorage.setItem("token", data.token);
		setAccountStateALL(
			true,
			data.userName,
			data.credits,
			data.items,
			undefined,
			data.email,
			data.verified,
			data.dateJoined,
			data.imgbig,
			data.settings
		);
	};
	const logOff = () => {
		localStorage.clear();
		sessionStorage.clear();

		// setAccountStateALL(false, "", 0, [], "", false, "");
		history.push("/");
		logout(accountState.user);
	};
	const trade = (data) => {
		setAccountStateALL(undefined, undefined, undefined, undefined, true);
		tradeFetch(
			data,
			accountState.user,
			sessionStorage.getItem("token"),
			(newState) => {
				setAccountStateALL(
					newState.logged,
					newState.user,
					newState.credits,
					newState.items,
					newState.pending
				);
			}
		);
	};

	const setOnline = (param) => {
		setAccountState({ ...accountState, settings: { showOnline: param } });
	};
	return (
		<myContext.Provider
			value={{
				accountState: {
					logged: accountState.logged,
					user: accountState.user,
					credits: accountState.credits,
					items: accountState.items,
					pending: accountState.pending,
					email: accountState.email,
					verified: accountState.verified,
					dateJoined: accountState.dateJoined,
					profilePic: accountState.profilePic,
					settings: accountState.settings,
					setAccountStateALL,
					setAccountState,
					logIn,
					logOff,
					trade,
					setOnline,
				},
			}}>
			{props.children}
		</myContext.Provider>
	);
};

export default ContextState;
