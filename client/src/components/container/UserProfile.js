import React from "react";
import "./css/UserProfile.css";
import myContext from "../../context/account/myContext";
import { Dropdown } from "semantic-ui-react";
import graphqlFetch from "../../functions/graphqlFetch";
import gqlGetPostsQuery from "../../functions/gqlGetPostsQuery";
import postContext from "../../context/post/postContext";
import PostItself from "../social/post/PostItself";
import PulsatingCircle from "../social/PulsatingCircle";
import addRemoveUser from "../../functions/addRemoveUser";
import FourOhFour from "./FourOhFour";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserPlus,
	faCheck,
	faRibbon,
	faComments,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";

const UserProfile = (props) => {
	const contextPost = React.useContext(postContext);
	const context = React.useContext(myContext);
	const [profileInfo, setProfileInfo] = React.useState({
		isValid: true,
		dateJoined: null,
		verified: null,
		isOnline: false,
		numberOfComments: 0,
		numberOfPosts: 0,
		profilePic: { base64: null, mimetype: "" },
	});
	const [sendItem, setSendItem] = React.useState({
		itemName: null,
		itemAmount: 1,
	});

	React.useEffect(() => {
		const e = { target: { value: sendItem.itemAmount } }; // FAKE e
		onChangeAmount(e);
	}, [context]); // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		fetch("/userprofile", {
			method: "get",
			headers: {
				"x-auth-token": sessionStorage.getItem("token"),
				"Content-Type": "application/json",
				"User-Name": props.userName,
				CurrentUser: context.accountState.user,
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
		graphqlFetch(
			gqlGetPostsQuery("USER", context.accountState.user, props.userName),
			(res) => {
				res.getPosts.sort((a, b) => {
					return a.timestamp < b.timestamp
						? 1
						: b.timestamp < a.timestamp
						? -1
						: 0;
				});
				contextPost.setPosts(res.getPosts);
			}
		); //eslint-disable-next-line
	}, []);

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
			fetch("/sendpresent", {
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

	// console.log(props);
	// const handleClick = () => {
	// 	addRemoveUser(props.userName, props.isListed, (response) => {
	// 		console.log(response);
	// 		// props.findUsersFetchCallback();
	// 	});
	// };
	// const element = <FontAwesomeIcon icon={faCoffee} />;

	// console.log(profileInfo.settings);

	return (
		<div>
			{profileInfo.isValid ? (
				<div className='user-profile'>
					<div className='profile-card'>
						<div className='main-img'>
							<img
								alt=''
								src={`data:${profileInfo.profilePic.mimetype};base64,${profileInfo.profilePic.base64}`}></img>
						</div>
						<div className='main-info'>
							<div className='basic'>
								<div className='title'>
									<div className='userName'>{props.userName}</div>
									<div className='pc'>
										{profileInfo.settings &&
											profileInfo.settings.showOnline && (
												<PulsatingCircle isOnline={profileInfo.isOnline} />
											)}
									</div>
									{props.userName !== context.accountState.user && (
										<p
											onClick={() =>
												addRemoveUser(
													props.userName,
													profileInfo.isListed,
													(response) => {
														if (response.status === "CONTACT ADDED") {
															setProfileInfo({
																...profileInfo,
																isListed: true,
															});
														} else {
															setProfileInfo({
																...profileInfo,
																isListed: false,
															});
														}
													}
												)
											}>
											{profileInfo.isListed ? (
												<FontAwesomeIcon
													className='hover-pointer'
													icon={faCheck}
													style={{ fontSize: "23px" }}
												/>
											) : (
												<FontAwesomeIcon
													className='hover-pointer'
													icon={faUserPlus}
													style={{ fontSize: "23px" }}
												/>
											)}
										</p>
									)}
								</div>
								{profileInfo.verified && (
									<FontAwesomeIcon
										icon={faRibbon}
										style={{ fontSize: "35px" }}
										color='orange'
									/>
								)}
								{profileInfo.verified ? "Verified" : "Not verified"}
								<br></br>
								Member since {profileInfo.dateJoined}
							</div>
							{props.userName !== context.accountState.user && (
								<div className='present'>
									<div className='select'>
										<Dropdown
											onChange={onChangeDropdown}
											className='Dropdown'
											placeholder='Select an item'
											fluid
											selection
											options={items}
										/>
										<input
											onChange={onChangeAmount}
											value={sendItem.itemAmount}
										/>
									</div>
									<button onClick={handleClick} className='Button'>
										Send
									</button>
								</div>
							)}
							<div className='stats'>
								<div className='stats-box'>
									<FontAwesomeIcon
										icon={faEdit}
										style={{ fontSize: "24px" }}
										color='black'
									/>
									<span>{profileInfo.numberOfPosts}</span>
								</div>
								<div className='stats-box'>
									<FontAwesomeIcon
										icon={faComments}
										style={{ fontSize: "24px" }}
										color='black'
									/>
									<span>{profileInfo.numberOfComments}</span>
								</div>
							</div>
						</div>
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
									isVerified={item.isVerified}
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
				<FourOhFour type='user' />
			)}
		</div>
	);
};

export default UserProfile;
