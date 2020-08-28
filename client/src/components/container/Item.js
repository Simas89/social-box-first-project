import React from "react";
import "./css/Item.css";
import myContext from "../../context/account/myContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

function Item(props) {
	const [inputState, setInputState] = React.useState(1);
	const context = React.useContext(myContext);

	const fixInputState = (tradeAmountInput) => {
		let tradeAmount = 1;
		parseInt(tradeAmountInput)
			? (tradeAmount = parseInt(tradeAmountInput))
			: (tradeAmount = 0);
		setInputState(tradeAmount);
	};

	const trade = (param) => {
		if (true) {
			if (
				(param === "BUY" && canBuy === true) ||
				(param === "SELL" && canSell === true)
			)
				context.accountState.trade({
					action: param,
					changeItemAmount: inputState,
					itemName: props.itemName,
				});
		}
	};
	// buy sell checks
	let canSell = false;
	let canBuy = false;
	inputState <= props.amount ? (canSell = true) : (canSell = false);
	props.price * inputState <= props.credits
		? (canBuy = true)
		: (canBuy = false);
	if (!inputState) {
		canBuy = false;
		canSell = false;
	}

	const handleChange = (e) => {
		const re = /^[0-9\b]+$/;
		if (e.target.value === "" || re.test(e.target.value))
			fixInputState(e.target.value);
	};
	const btnStyle = (param) => {
		if (param === "BUY")
			if (canBuy === true)
				return {
					color: "white",
					backgroundColor: "#007fed",
				};
			else
				return {
					color: "black",
					backgroundColor: "#E5E5E5",
				};
		if (param === "SELL")
			if (canSell === true)
				return {
					color: "white",
					backgroundColor: "#007fed",
				};
			else
				return {
					color: "black",
					backgroundColor: "#E5E5E5",
				};
	};

	return (
		<React.Fragment>
			<div className='item-wrap'>
				<div className='item'>
					<div className='icon-box'>
						<FontAwesomeIcon
							className='icon'
							icon={faGift}
							style={{ fontSize: "28px" }}
							color='orange'
						/>
						<div className='ammount'> {props.amount}</div>
					</div>
					<div className='description'>
						<span>this is item description</span>
					</div>
					<div className='buy'>
						<button
							className='btn'
							style={btnStyle("BUY")}
							onClick={() => trade("BUY")}>
							Cr: {props.price}
						</button>
						<input
							onChange={handleChange}
							type='text'
							value={inputState}></input>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Item;

{
	/* <div>{props.itemName}</div>
<div>Cr: {props.price}</div>
<div>Stock: {props.amount}</div>
{props.displayedAt === "MARKET" && (
	<React.Fragment>
		<button style={btnStyle("BUY")} onClick={() => trade("BUY")}>
			Buy
		</button>
		<input
			onChange={handleChange}
			type='text'
			value={inputState}></input>
		<button style={btnStyle("SELL")} onClick={() => trade("SELL")}>
			Sell
		</button>
	</React.Fragment>
)} */
}
