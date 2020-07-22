import React from "react";
import "./css/MasterButton.css";
import landingContext from "../context/landing/landingContext";
import { Icon } from "semantic-ui-react";
import useOutsideClick from "../../hooks/useOutsideClick";

const MasterButtonLogin = (props) => {
	const contextLanding = React.useContext(landingContext);
	const [stage, setStage] = React.useState(1);
	const [freeze, setFreeze] = React.useState(false); // if stage should freeze
	const stageClassReturn = () => {
		if (stage === 0) return "shift-0"; // input err
		if (stage === 1) return "shift-1"; // base
		if (stage === 2) return "shift-2"; // next
		if (stage === 3) return "shift-3"; // server err
	};

	let ref = React.useRef();
	useOutsideClick(ref, () => {
		setStage(1);
		setFreeze(false);
	});

	const buttonManager = (type) => {
		switch (type) {
			case "exec": {
				console.log(type);
				if (props.msg1 !== "OK") {
					setStage(0);
				} else {
					setStage(2);
					setFreeze(true);
					console.log("SUCCESS!");
				}
				break;
			}
			case 1: {
				console.log(type);
				!freeze && setStage(1);
				break;
			}
			case 2: {
				console.log(type);
				break;
			}
		}
	};
	console.log(freeze);

	// console.log(contextLanding.state.LR);

	// console.log(props);

	return (
		<div ref={ref} className={"top-kiautas  with-remember-space"}>
			<div
				onClick={() => contextLanding.toggle_remember_me()}
				className='radio'>
				<div
					className='radio-ring'
					style={contextLanding.state.rememberMe ? { opacity: 0.8 } : {}}>
					<div
						className='radio-ring-inside'
						style={
							contextLanding.state.rememberMe ? { opacity: 0.8 } : {}
						}></div>
				</div>
			</div>
			<div className={`master-button-wrapper `}>
				<div
					className={`contents ${stageClassReturn()}`}
					onClick={() => buttonManager("exec")}
					onMouseEnter={() => props.msg1 === "OK" && buttonManager(2)}
					onMouseLeave={() => props.msg1 === "OK" && buttonManager(1)}>
					<div className='box'>
						<p>{props.msg1}</p>
					</div>
					<div className='box stage1-box'>
						<p>{props.stage1}</p>
					</div>
					<div className='box'>
						<Icon name={props.stage2} size='large' />
					</div>
					<div className='box'>
						<p>Item-3</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MasterButtonLogin;
