import React from "react";
import { useHistory } from "react-router-dom";
import "./css/MasterButton.css";
import landingContext from "../../context/landing/landingContext";
import accountContext from "../../context/account/myContext";
import { Icon } from "semantic-ui-react";
import useOutsideClick from "../../hooks/useOutsideClick";
import logInFetch from "../../functions/logInFetch";
import registerFetch from "../../functions/registerFetch";

const MasterButtonLogin = (props) => {
	const contextLanding = React.useContext(landingContext);
	const contextAccount = React.useContext(accountContext);
	const history = useHistory();
	const [stage, setStage] = React.useState({ stage: 1 });
	const [freeze, setFreeze] = React.useState(false); // if stage should freeze

	const stageClassReturn = () => {
		if (stage.stage === 0) return "shift-0"; // input err
		if (stage.stage === 1) return "shift-1"; // base
		if (stage.stage === 2) return "shift-2"; // next
		if (stage.stage === 3) return "shift-3"; // server err
	};

	//eslint-disable-next-line
	const logIn = () => {
		logInFetch(
			{
				inputValueName: contextLanding.state.userInputs.userName,
				inputValuePsw: contextLanding.state.userInputs.psw1,
				rememberMe: contextLanding.state.rememberMe,
				aotoLogin: localStorage.getItem("rememberme"),
			},
			(data) => {
				if (data.status === "LOGGING IN") {
					contextLanding.user_inputs_clear();
					contextAccount.accountState.logIn(data);
					history.push("/app");
				} else {
					setStage({ stage: 3, msg: data.status });
					setFreeze(true);
				}
			}
		);
	};

	const register = () => {
		registerFetch(
			{
				inputValueName: contextLanding.state.userInputs.userName,
				inputValuePsw: contextLanding.state.userInputs.psw1,
			},
			(data) => {
				if (data.status === "USER REGISTERED") {
					logIn();
				} else {
					setStage({ stage: 3, msg: data.status });
					setFreeze(true);
				}
			}
		);
	};

	React.useEffect(() => {
		if (localStorage.getItem("rememberme")) {
			console.log("Executing auto-login");
			logIn();
		}
	}, [logIn]);

	let ref = React.useRef();
	useOutsideClick(ref, () => {
		setStage({ stage: 1 });
		setFreeze(false);
	});

	const buttonManager = (type) => {
		switch (type) {
			case "exec": {
				if (props.msg1 !== "OK") {
					setStage({ stage: 0 });
				} else {
					setStage({ stage: 2 });
					setFreeze(true);
					contextLanding.state.LR ? register() : logIn();
				}
				break;
			}
			case 1: {
				!freeze && setStage({ stage: 1 });
				break;
			}
			case 2: {
				!freeze && setStage({ stage: 2 });
				break;
			}
			default:
				break;
		}
	};
	//eslint-disable-next-line
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

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
					{/*stage 0 */}
					<div className='box stage0-box'>
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
						<p>{stage.msg ? stage.msg.toLowerCase().capitalize() : ""}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MasterButtonLogin;
