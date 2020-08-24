import React from "react";
import "./css/LandingLogged.css";
import accountContext from "../../context/account/myContext";
import postContext from "../../context/post/postContext";

import { useHistory } from "react-router-dom";

const LandingLogged = () => {
	const contextAccount = React.useContext(accountContext);
	const contextPost = React.useContext(postContext);
	console.log(contextPost);
	const history = useHistory();
	return (
		<div className='landing-logged'>
			<div className='logged-title'>
				LOGGED IN AS {contextAccount.accountState.user.toUpperCase()}
			</div>
			<div className='logged-button-wrapper'>
				<div
					onClick={() => history.push("/app")}
					className='logged-button-return'>
					Return
				</div>
				<div
					onClick={() => {
						contextAccount.accountState.logOff();
						contextPost.resetPosts();
					}}
					className='logged-button-logout'>
					Log-Out
				</div>
			</div>
		</div>
	);
};

export default LandingLogged;
