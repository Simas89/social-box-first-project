import React from "react";
import "./css/Item.css";
import myContext from "../../context/account/myContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGift,
	faAppleAlt,
	faBeer,
	faBirthdayCake,
	faJoint,
	faCheese,
	faPoo,
	faCookie,
	faBacon,
	faCat,
	faDog,
	faHorseHead,
} from "@fortawesome/free-solid-svg-icons";

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

	// const handleChange = (e) => {
	// 	const re = /^[0-9\b]+$/;
	// 	if (e.target.value === "" || re.test(e.target.value))
	// 		fixInputState(e.target.value);
	// };
	const selectIcon = () => {
		switch (props.itemName) {
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
			case "Horse":
				return faHorseHead;

			default:
				return faGift;
		}
	};

	const selectDescription = () => {
		switch (props.itemName) {
			case "Apple":
				return "Fresh pink apple";
			case "Beer":
				return "I fucking love beer";
			case "Cake":
				return "A massive cake";
			case "Joint":
				return "Afhan kush";
			case "Cheese":
				return "Oh sheesus";
			case "Poo":
				return "...a smiling poop";
			case "Cookie":
				return "A cookie you cannot say no to";
			case "Bacon":
				return "Smoked back bacon";
			case "Cat":
				return "Puffy cat";
			case "Dog":
				return "Agile dog with dot on his eye";
			case "Horse":
				return "A proper horse";

			default:
				return "Item";
		}
	};

	return (
		<React.Fragment>
			<div className='item-wrap'>
				<div className='item'>
					<div className='icon-box'>
						<FontAwesomeIcon
							className='icon'
							icon={selectIcon()}
							style={{ fontSize: "28px" }}
							color={`${props.amount ? "orange" : "lightgray"}`}
						/>
						<div className='ammount'> {props.amount}</div>
					</div>
					<div className='description'>
						<span>{selectDescription()}</span>
					</div>
					<div className='buy'>
						<button
							className={`btn ${canBuy && "can-buy"}`}
							onClick={() => trade("BUY")}>
							Cr {props.price}
						</button>
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
