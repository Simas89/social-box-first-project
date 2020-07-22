import React from "react";
import "./css/MasterButton.css";
import landingContext from "../context/landing/landingContext";
import { Icon } from "semantic-ui-react";
import useOutsideClick from "../../hooks/useOutsideClick";

const MasterButtonSend = (props) => {
	const contextLanding = React.useContext(landingContext);
	const [stage, setStage] = React.useState(1);
	const stageClassReturn = () => {
		if (stage === 0) return "shift-0";
		if (stage === 1) return "shift-1";
		if (stage === 2) return "shift-2";
		if (stage === 3) return "shift-3";
	};

	let ref = React.useRef();
	useOutsideClick(ref, () => {
		setStage(1);
	});

	const buttonManager = () => {
		if (props.msg1 !== "OK") {
			setStage(0);
		} else {
			setStage(2);
		}
	};

	return (
		<div ref={ref} className={"top-kiautas"}>
			<div className={`master-button-wrapper `}>
				<div
					className={`contents ${stageClassReturn()}`}
					onClick={(e) => buttonManager(e)}
					onBlur={() => console.log("blur")}>
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

export default MasterButtonSend;
