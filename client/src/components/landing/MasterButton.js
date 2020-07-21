import React from "react";
import "./css/MasterButton.css";
import landingContext from "../context/landing/landingContext";
import { Icon } from "semantic-ui-react";

const MasterButton = (props) => {
	const contextLanding = React.useContext(landingContext);
	const [stage, setStage] = React.useState(1);
	const stageClassReturn = () => {
		if (stage === 0) return "shift-0";
		if (stage === 1) return "shift-1";
		if (stage === 2) return "shift-2";
		if (stage === 3) return "shift-3";
	};
	return (
		<div className={`top-kiautas ${props.remember && " with-remember-space"}`}>
			{props.remember ? (
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
			) : null}
			<div className={`master-button-wrapper `}>
				<div
					className={`contents ${stageClassReturn()}`}
					onClick={() => setStage(2)}
					onMouseEnter={() => setStage(0)}
					onMouseLeave={() => setStage(1)}>
					<div className='box'>
						<p>Minus</p>
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

export default MasterButton;
