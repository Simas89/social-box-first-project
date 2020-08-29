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
	const context = React.useContext(myContext);

	const trade = (param) => {
		context.accountState.trade({
			action: param,
			changeItemAmount: 1,
			itemName: props.itemName,
		});
	};

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
				return "Smoked back bacon rasher";
			case "Cat":
				return "Puffy cat";
			case "Dog":
				return "Agile dog with dot on his eye";
			case "Horse":
				return "A real horse";

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
							className={`btn ${props.price * 1 <= props.credits && "can-buy"}`}
							onClick={() => {
								props.price * 1 <= props.credits && trade("BUY");
							}}>
							Cr {props.price}
						</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Item;
