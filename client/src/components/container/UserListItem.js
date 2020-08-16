import React from "react";
import styled from "styled-components";
import addRemoveUser from "../../functions/addRemoveUser";
import PulsatingCircle from "../social/PulsatingCircle";

function UserListItem(props) {
	const handleClick = () => {
		addRemoveUser(props.userName, props.isListed, (response) => {
			console.log(response);
			props.passedUpdateToRefreshContacts();
		});
	};
	const showUser = () => {
		props.showUser(props.userName);
	};
	return (
		<React.Fragment>
			<UserListItemStyled>
				<p>
					<img
						alt=''
						src={`data:${props.imgMini.contentType};base64,${props.imgMini.data}`}></img>
					{props.userName}
					<PulsatingCircle isOnline={props.isOnline} />
				</p>
				<button onClick={handleClick}>{props.isListed ? "-" : "+"}</button>
				<button onClick={showUser}>info</button>
			</UserListItemStyled>
		</React.Fragment>
	);
}

const UserListItemStyled = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 150px);
	p {
		margin: 10px;
	}
`;

export default UserListItem;
