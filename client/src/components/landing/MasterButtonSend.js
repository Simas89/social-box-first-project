import React from "react";
import "./css/MasterButton.css";
// import landingContext from "../context/landing/landingContext";
import { Icon } from "semantic-ui-react";
import useOutsideClick from "../../hooks/useOutsideClick";

const MasterButtonSend = (props) => {
	// const contextLanding = React.useContext(landingContext);
	const [stage, setStage] = React.useState(1);
	const [freeze, setFreeze] = React.useState(false); // if stage should freeze
	const stageClassReturn = () => {
		if (stage === 0) return "shift-0"; // input err
		if (stage === 1) return "shift-1"; // base
		if (stage === 2) return "shift-2"; // next
		if (stage === 3) return "shift-3"; // server err or all good
	};

	let ref = React.useRef();
	useOutsideClick(ref, () => {
		setStage(1);
		setFreeze(false);
	});

	const buttonManager = (type) => {
		switch (type) {
			case "exec": {
				if (props.msg1 !== "OK") {
					setStage(0);
				} else {
					setStage(2);
					setFreeze(true);
					sendMeEmail();
				}
				break;
			}
			case 1: {
				!freeze && setStage(1);
				break;
			}
			case 2: {
				setStage(2);
				break;
			}
			default:
				break;
		}
	};
	const sendMeEmail = () => {
		console.log("sending email");
		setTimeout(() => setStage(3), 1000);
	};

	return (
		<div ref={ref} className={"top-kiautas"}>
			<div className={`master-button-wrapper `}>
				<div
					className={`contents ${stageClassReturn()}`}
					onClick={() => buttonManager("exec")}
					onMouseEnter={() =>
						props.msg1 === "OK" && stage !== 3 && buttonManager(2)
					}
					onMouseLeave={() =>
						props.msg1 === "OK" && stage !== 3 && buttonManager(1)
					}>
					{/*stage 0 */}
					<div className='box'>
						<p>{props.msg1}</p>
					</div>
					{/*stage 1 */}
					<div className='box stage1-box'>
						<p>{props.stage1}</p>
					</div>
					{/*stage 2 */}
					<div className='box'>
						<Icon name={props.stage2} size='large' />
					</div>
					{/*stage 3 */}
					<div className='box'>
						<Icon name={"check"} size='large' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MasterButtonSend;
