import React from "react";
import "./css/PopUpMenu.css";
import useOutsideClick from "../../../hooks/useOutsideClick";

const PopUpMenu = (props) => {
	const [isMenu, setIsMenu] = React.useState(0);
	const [confirmationStage, setConfirmationStage] = React.useState(0);
	const [action, setAction] = React.useState("");

	// console.log(props);
	let ref = React.useRef();
	useOutsideClick(ref, () => {
		if (isMenu && action === "") {
			console.log("Click Outside");
			setIsMenu(0);
		}
	});

	const btn1 = () => {
		if (!confirmationStage) {
			setConfirmationStage(1);
			setAction("EDIT");
			props.trigEdit();
		} else {
			if (action === "DEL") {
				props.trigDel();
			}
			if (action === "EDIT") {
				props.trigEditSave();
				setConfirmationStage(0);
				setAction("");
				setIsMenu(0);
			}
		}
	};

	const btn2 = () => {
		if (!confirmationStage) {
			setConfirmationStage(1);
			setAction("DEL");
		} else {
			if (action === "EDIT") {
				props.trigEditDiscard();
			}
			setConfirmationStage(0);
			setAction("");
			setIsMenu(0);
		}
	};

	return (
		<React.Fragment>
			<div onClick={() => setIsMenu(1)} className='menu'>
				<p>•••</p>
			</div>
			{isMenu ? (
				<div ref={ref} className='popup'>
					<div className='btn' onClick={() => btn1()}>
						{confirmationStage ? "Confirm" : "Edit"}
					</div>
					<div className='btn' onClick={() => btn2()}>
						{confirmationStage ? "Discard" : "Remove"}
					</div>
				</div>
			) : null}
		</React.Fragment>
	);
};

export default PopUpMenu;
