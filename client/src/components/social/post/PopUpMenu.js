import React from "react";
import "./css/PopUpMenu.css";
import useOutsideClick from "../../../hooks/useOutsideClick";

const PopUpMenu = (props) => {
	const [isMenu, setIsMenu] = React.useState({ menu: 0, btnHide: 0 });
	const [confirmationStage, setConfirmationStage] = React.useState(0);
	const [action, setAction] = React.useState("");

	// console.log(props);
	let ref = React.useRef();
	useOutsideClick(ref, () => {
		if (isMenu.menu && action === "") {
			startCloseMenu();
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
				setAction("");
				startCloseMenu();
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
			setAction("");
			startCloseMenu();
		}
	};

	const startCloseMenu = () => {
		setIsMenu({ ...isMenu, btnHide: 1 });
		setTimeout(() => {
			setIsMenu({ btnHide: 0, menu: 0 });
			setConfirmationStage(0);
		}, 200);
	};

	return (
		<React.Fragment>
			<div
				onClick={() => setIsMenu({ ...isMenu, menu: 1 })}
				className={`menu ${isMenu.menu && "hide"} `}>
				<p>•••</p>
			</div>
			{isMenu.menu ? (
				<div ref={ref} className={`popup ${isMenu.btnHide && "btn-hide"}`}>
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
