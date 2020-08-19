import React from "react";
import "./css/UserProfile.css";
import myContext from "../../context/account/myContext";
import { Dropdown, Input, Button } from "semantic-ui-react";
import graphqlFetch from "../../functions/graphqlFetch";
import gqlGetPostsQuery from "../../functions/gqlGetPostsQuery";
import postContext from "../../context/post/postContext";
import PostItself from "../social/post/PostItself";
import PulsatingCircle from "../social/PulsatingCircle";

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
		graphqlFetch(
			gqlGetPostsQuery("USER", context.accountState.user, props.userName),
			(res) => {
				contextPost.setPosts(res.getPosts);
			}
		);
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

	console.log(props);

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
										<PulsatingCircle isOnline={profileInfo.isOnline} />
									</div>
								</div>
								Member since: {profileInfo.dateJoined} <br></br>
								Account status:{" "}
								{profileInfo.verified ? "Verified" : "Not verified"}
							</div>

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
		</div>
	);
};

export default UserProfile;
