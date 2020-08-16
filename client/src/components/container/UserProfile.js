import React from "react";
import myContext from "../../context/account/myContext";
import styled from "styled-components";
import { Dropdown, Input, Button, Icon } from "semantic-ui-react";
import graphqlFetch from "../../functions/graphqlFetch";
import gqlGetPostsQuery from "../../functions/gqlGetPostsQuery";
import postContext from "../../context/post/postContext";
import PostItself from "../social/post/PostItself";

const UserProfile = (props) => {
	const contextPost = React.useContext(postContext);
	const context = React.useContext(myContext);
	const [profileInfo, setProfileInfo] = React.useState({
		isValid: true,
		dateJoined: null,
		verified: null,
		isOnline: false,
		profilePic: { base64: null, mimetype: "" },
	});
	const [sendItem, setSendItem] = React.useState({
		itemName: null,
		itemAmount: 1,
	});

	const getPosts = (query) => {
		graphqlFetch(query, (res) => {
			contextPost.setPosts(res.getPosts);
			console.log(res);
		});
	};

	React.useEffect(() => {
		const e = { target: { value: sendItem.itemAmount } }; // FAKE e
		onChangeAmount(e);
	}, [context]); // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		fetch("http://localhost:2000/userprofile", {
			method: "get",
			headers: {
				"x-auth-token": sessionStorage.getItem("token"),
				"Content-Type": "application/json",
				"User-Name": props.userName,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status !== "USER NOT FOUND") {
					data.isValid = true;
					setProfileInfo(data);
				} else setProfileInfo({ isValid: false });
			})
			.catch((err) => {
				console.log(err);
			});

		contextPost.resetPosts();
		getPosts(
			gqlGetPostsQuery("USER", context.accountState.user, props.userName)
		);
		//eslint-disable-next-line
	}, [props.userName]);

	const items = context.accountState.items.map((item) => {
		return {
			key: item.id,
			text: `${item.itemName}(${item.amount})`,
			value: item.itemName,
		};
	});

	const onChangeDropdown = (e, { value }) => {
		const stockAmount =
			context.accountState.items[
				context.accountState.items.findIndex((item) => item.itemName === value)
			].amount;

		if (stockAmount < sendItem.itemAmount)
			setSendItem({ itemAmount: stockAmount, itemName: value });
		else setSendItem({ ...sendItem, itemName: value });
	};

	const onChangeAmount = (e) => {
		const re = /^[0-9\b]+$/;
		if (e.target.value === "" || re.test(e.target.value)) {
			let stockAmount;
			try {
				stockAmount =
					context.accountState.items[
						context.accountState.items.findIndex(
							(item) => item.itemName === sendItem.itemName
						)
					].amount;
			} catch (error) {
				stockAmount = 100;
			}
			//
			if (stockAmount < e.target.value) {
				if (stockAmount === 0) setSendItem({ itemName: "", itemAmount: 1 });
				setSendItem({ ...sendItem, itemAmount: stockAmount });
			} else setSendItem({ ...sendItem, itemAmount: e.target.value });
		} else setSendItem({ ...sendItem, itemAmount: 1 });
	};

	const handleClick = () => {
		if (sendItem.itemAmount > 0 && sendItem.itemName !== null) {
			fetch("http://localhost:2000/sendpresent", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": sessionStorage.getItem("token"),
				},
				body: JSON.stringify({
					fromUser: context.accountState.user,
					toUser: props.userName,
					itemName: sendItem.itemName,
					amount: sendItem.itemAmount,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					Array.isArray(data.updatedItems) &&
						context.accountState.setAccountStateALL(
							undefined,
							undefined,
							undefined,
							data.updatedItems,
							undefined
						);
					if (data.thatWasTheLastItem) {
						setTimeout(
							() =>
								setSendItem({
									itemName: null,
									itemAmount: sendItem.itemAmount,
								}),
							1
						);
					}
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<React.Fragment>
			<UserProfileStyle>
				{profileInfo.isValid ? (
					<div className='profile-card'>
						<h1>{props.userName}</h1>
						<div className='main-img'>
							<img
								alt=''
								src={`data:${profileInfo.profilePic.mimetype};base64,${profileInfo.profilePic.base64}`}></img>
							<div>
								Member since: {profileInfo.dateJoined} <br></br>
								Account status:{" "}
								{profileInfo.verified ? "Verified" : "Not verified"}
								<br />
								{profileInfo.isOnline ? (
									<Icon name='circle' size='small' color='green' />
								) : (
									<Icon name='circle' size='small' color='grey' />
								)}
							</div>
						</div>

						<div className='inputs'>
							<Dropdown
								onChange={onChangeDropdown}
								className='Dropdown'
								placeholder='Select an item'
								fluid
								selection
								options={items}
							/>
							<Input onChange={onChangeAmount} value={sendItem.itemAmount} />
							<Button onClick={handleClick} className='Button'>
								Send
							</Button>
						</div>
						<div className='social-window'>
							{" "}
							{contextPost.state.posts &&
								contextPost.state.posts.map((item, index) => (
									<PostItself
										key={item._id}
										_id={item._id}
										index={index}
										userName={item.userName}
										textContent={item.textContent}
										timestamp={item.timestamp}
										isOnline={item.isOnline}
										edited={item.edited}
										imgsmall={item.imgsmall}
									/>
								))}
						</div>
					</div>
				) : (
					<h1>404 Couldn't find this user (╯°□°）╯︵ ┻━┻</h1>
				)}
			</UserProfileStyle>
		</React.Fragment>
	);
};
const UserProfileStyle = styled.div`
	.profile-card {
		border: 1px solid blue;
		display: flex;
		flex-direction: column;
		h1 {
			text-align: center;
		}
		.main-img {
			margin: auto;
			border: 1px solid green;
		}
		.social-window {
			position: relative;
			border: 1px solid red;
		}
	}
`;

export default UserProfile;
