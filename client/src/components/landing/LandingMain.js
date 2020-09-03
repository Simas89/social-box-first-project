import React from "react";
import "./css/LandingMain.css";
import Formike from "./Formike";
import { Scrollbars } from "react-custom-scrollbars";
import accountContext from "../../context/account/myContext";
import SitePresentation from "./SitePresentation";
import useTimer from "../../hooks/useTimer";

const MovingContainer = (props) => {
	const style = {
		position: "absolute",
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		width: "200%",
		height: "100%",
		left: props.page ? "-100%" : "0%",

		transition: "left .5s",
		// border: "1px solid red",
	};
	return (
		<div style={style}>
			<Formike type='LOGIN' />
			<Formike type='CONTACT' />
		</div>
	);
};
// console.log("/////a/aaaazaz/ss/xs//a/x//xxa/x/s////x///x//");

const LandingMain = () => {
	const contextAccount = React.useContext(accountContext);

	const [scrollStage, setScrollStage] = React.useState(1);
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
	const [page, setPage] = React.useState(0);

	const resizeEvent = () => {
		setWindowWidth(window.innerWidth);
		console.log("resizeEvent");
	};

	React.useEffect(() => {
		window.title = "Simas Zurauskas | Home";
		window.addEventListener("resize", resizeEvent);
		return () => {
			window.removeEventListener("resize", resizeEvent);
		};
	}, []);

	const parseLines = (num) => {
		let arr = [];
		for (let i = 0; i < num; i++) {
			arr.push(<div className={`box  col-${i}`} key={i}></div>);
		}
		return arr;
	};
	const randomNum = (num) => {
		const rand = Math.floor(Math.random() * (num - 0 + 1)) + 0;
		return rand;
	};

	const addClassShine = (num) => {
		const target = document.querySelector(`.col-${randomNum(num)}`);
		// target.classList.add("shine");
		try {
			target.style.opacity = 0.8;
			// console.log(target);
			setTimeout(() => (target.style.opacity = 0.2), randomNum(15) * 1000);
		} catch (error) {
			// console.log(error);
		}
	};

	const mongoose = document.querySelector(".lil-mongoose");
	useTimer(1, 1, (period) => {
		randomNum(4) === 1 && addClassShine(parseInt(windowWidth / 40));
		// console.log(period);
		if (period === 60) mongoose.classList.add("lil-mongoose-rise");
	});

	const mongooseHide = () => {
		console.log("hide");
		mongoose.classList.add("lil-mongoose-hide");
	};

	return (
		<React.Fragment>
			<div className='landing-main'>
				<div className='top-bar-shader'>
					{parseLines(parseInt(windowWidth / 40))}
				</div>

				<div className='title'>
					<h1 className='simas'>Hello. My name is Simas Zurauskas and </h1>
					<div>
						<h1 className='full-stack'>I AM A FULL-STACK WEB DEVELOPER</h1>
						<h1 className='full-stack-second'>
							I AM A FULL-STACK WEB DEVELOPER
						</h1>
					</div>
				</div>

				<div className='landing-box box-1'>
					{/* <h1 className='simas'>Simas Zurauskas</h1> */}
					<div className='box-content'>
						<Scrollbars
							className='Scrollbars'
							autoHide
							autoHideTimeout={2000}
							autoHideDuration={200}
							thumbMinSize={3}
							universal={true}
							renderThumbVertical={(props) => (
								<div className='thumb-vertical' />
							)}>
							<SitePresentation />
						</Scrollbars>
					</div>
				</div>
				<div
					className={`landing-box box-2 ${
						!contextAccount.accountState.logged && "box-padding"
					}  `}>
					<div className={`lil-mongoose`} onMouseOver={mongooseHide}></div>
					<div className='box-content'>
						{windowWidth > 768 ? (
							<MovingContainer page={page} />
						) : (
							<Formike type='LOGIN' />
						)}
						<div className='form-navigaror'>
							<div
								onClick={() => setPage(0)}
								className='form-navigator-button-hide'>
								<div
									className={
										page
											? "form-navigator-button "
											: "form-navigator-button pulsating-circle"
									}></div>
							</div>
							<div
								onClick={() => setPage(1)}
								className='form-navigator-button-hide'>
								<div
									className={
										page
											? "form-navigator-button pulsating-circle"
											: "form-navigator-button"
									}></div>
							</div>
						</div>
					</div>
				</div>
				<div className='landing-box box-3'>
					<div className='box-content'>
						<Formike type='CONTACT' />
					</div>
				</div>
				{/* MOBILE MENU SCROLL */}
				<div className='mobile-navigator'>
					<div
						onClick={() => {
							setScrollStage(1);
						}}
						className='mobile-navigator-button-hide '>
						<div
							className={
								scrollStage === 1
									? "mobile-navigator-button pulsating-circle"
									: "mobile-navigator-button"
							}></div>
					</div>
					<div
						onClick={() => {
							setScrollStage(2);
						}}
						className='mobile-navigator-button-hide'>
						<div
							className={
								scrollStage === 2
									? "mobile-navigator-button pulsating-circle"
									: "mobile-navigator-button"
							}></div>
					</div>
					<div
						onClick={() => {
							setScrollStage(3);
						}}
						className='mobile-navigator-button-hide '>
						<div
							className={
								scrollStage === 3
									? "mobile-navigator-button pulsating-circle"
									: "mobile-navigator-button"
							}></div>
					</div>
				</div>
				<div className='footer'>
					<p>
						<span>2020 </span>SimasZurauskas@gmail.com
					</p>
				</div>
			</div>
			{/* <div className='footer2'>
				<p>
					<span>2020 </span>SimasZurauskas@gmail.com
				</p>
			</div> */}
		</React.Fragment>
	);
};

export default LandingMain;
