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
import { css } from "@emotion/core";
import { PulseLoader } from "react-spinners";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserPlus,
	faCheese,
	faGift,
	faAppleAlt,
	faBeer,
	faBirthdayCake,
	faJoint,
	faPoo,
	faCookie,
	faBacon,
	faCat,
	faDog,
	faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const UserProfile = (props) => {
	const contextPost = React.useContext(postContext);
	const context = React.useContext(myContext);
	const [profileInfo, setProfileInfo] = React.useState({
		isValid: -1,
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
	let location = useLocation();

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
				window.scrollTo(0, 0);
				if (data.status !== "USER NOT FOUND") {
					data.isValid = true;
					setProfileInfo(data);
				} else setProfileInfo({ isValid: false });
			})
			.catch((err) => {
				console.log(err);
			});

		// contextPost.resetPosts();
		// window.scrollTo(0, 0);
		graphqlFetch(
			gqlGetPostsQuery("USER", context.accountState.user, props.userName),
			(res) => {
				// res.getPosts.sort((a, b) => {
				// 	return a.timestamp < b.timestamp
				// 		? 1
				// 		: b.timestamp < a.timestamp
				// 		? -1
				// 		: 0;
				// });
				contextPost.setPosts(res.getPosts);
			}
		); //eslint-disable-next-line
	}, [location.pathname]);

	const selectIcon = (name) => {
		switch (name) {
			case "Apple":
				return faAppleAlt;
			case "Beer":
				return faBeer;
			case "Cake":
				return faBirthdayCake;
			case "Joint":
				return faJoint;
			case "Cheese":
				return faCheese;
			case "Poo":
				return faPoo;
			case "Cookie":
				return faCookie;
			case "Bacon":
				return faBacon;
			case "Cat":
				return faCat;
			case "Dog":
				return faDog;
			case "John Doe":
				return faUserSecret;

			default:
				return faGift;
		}
	};

	const items = context.accountState.items.map((item) => {
		return {
			key: item.id,
			text: `${item.itemName} ${item.amount}`,
			value: item.itemName,
			image: (
				<FontAwesomeIcon
					className='icon'
					icon={selectIcon(item.itemName)}
					style={{ fontSize: "20px" }}
					color='orange'
				/>
			),
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
	const override = css`
		display: block;
		margin: 0 auto;
	`;

	return profileInfo.isValid !== -1 ? (
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
							<div className='top-right-menu'>•••</div>
							<div>
								<div className='basic'>
									<div className='title'>
										<div className='pc'>
											{profileInfo.settings &&
												profileInfo.settings.showOnline && (
													<PulsatingCircle isOnline={profileInfo.isOnline} />
												)}
										</div>
										<div className='userName'>{props.userName}</div>
										{/* {props.userName !== context.accountState.user && (
											<p className='add-remove'>
												{profileInfo.isListed ? (
													<span>USER ADDED</span>
												) : (
													<FontAwesomeIcon
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
														}
														className='hover-pointer'
														icon={faUserPlus}
														style={{ fontSize: "23px" }}
													/>
												)}
											</p>
										)} */}
									</div>
									{profileInfo.verified && (
										<i className='fas fa-ribbon ribon'></i>
									)}
									{profileInfo.verified ? null : (
										<React.Fragment>
											Not verified<br></br>
										</React.Fragment>
									)}
									Member since {profileInfo.dateJoined}
								</div>
								{props.userName !== context.accountState.user && (
									<div className='present'>
										<div className='select'>
											<FontAwesomeIcon
												className='hover-pointer'
												icon={faGift}
												style={{ fontSize: "23px" }}
												color='orange'
											/>
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
										<button onClick={handleClick} className=' hover-pointer'>
											SEND
										</button>
									</div>
								)}
							</div>

							<div className='stats'>
								<div className='top-line-grad'></div>
								<div className='stats-box'>
									<span className='top-span'>POSTS</span>
									<span className='bottom-span'>
										{profileInfo.numberOfPosts}
									</span>
								</div>
								<div className='stats-box'>
									<span className='top-span'>COMMENTS</span>
									<span className='bottom-span'>
										{profileInfo.numberOfComments}
									</span>
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
	) : (
		<div className='sweet-loading'>
			<PulseLoader
				css={override}
				size={8}
				margin={5}
				color={"rgba(40, 94, 53,1)"}
			/>
		</div>
	);
};

export default UserProfile;
