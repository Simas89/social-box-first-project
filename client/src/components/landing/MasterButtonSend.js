import React from "react";
import "./css/MasterButton.css";
import landingContext from "../../context/landing/landingContext";
import { Icon } from "semantic-ui-react";
import useOutsideClick from "../../hooks/useOutsideClick";
import graphqlFetch from "../../functions/graphqlFetch";

const MasterButtonSend = (props) => {
	const contextLanding = React.useContext(landingContext);
	const [stage, setStage] = React.useState(1);
	const [freeze, setFreeze] = React.useState(false); // if stage should freeze
	const [emailSuccess, setEmailSuccess] = React.useState(0);
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
					console.log("sending email");
					setStage(2);
					setFreeze(true);

					graphqlFetch(query, (res) => {
						// console.log(res);
						res.messageToMe === "OK" ? setEmailSuccess(1) : setEmailSuccess(0);
						setStage(3);
					});
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

	const query = `
	messageToMe(guest: "${contextLanding.state.msgInputs.guest}" ,
	email: "${contextLanding.state.msgInputs.email}" ,
	msg: "${contextLanding.state.msgInputs.msg}"
	)`;

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
						<Icon name={`${emailSuccess ? "check" : "delete"}`} size='large' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MasterButtonSend;
