import React from "react";
import "./css/LandingMain.css";
import Formike from "./Formike";

const MovingContainer = (props) => {
	const style = {
		position: "absolute",
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		width: "200%",
		height: "100%",
		left: props.page ? "-100%" : "0%",

		transition: "left .5s",
		border: "2px solid red",
	};
	return (
		<div style={style}>
			<Formike type='LOGIN' />
			<Formike type='CONTACT' />
		</div>
	);
};

const LandingMain = () => {
	// UI >
	const [scrollStage, setScrollStage] = React.useState(1);
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
	const [page, setPage] = React.useState(0);
	window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
	window.addEventListener("scroll", () => {
		let scrollPosition = window.pageYOffset;
		const parallax = document.querySelector(".parallax");
		parallax.style.transform = `translateY(${scrollPosition * 0.6}px)`;
	});

	// Pge scroll stuff
	React.useEffect(() => {
		if (scrollStage === 1) window.scrollTo(0, 0);
		if (scrollStage === 2) window.scrollTo(0, window.innerHeight);
		if (scrollStage === 3) window.scrollTo(0, window.innerHeight * 2);
	}, [scrollStage]);
	if (scrollStage === 1) window.scrollTo(0, 0);
	if (scrollStage === 2) window.scrollTo(0, window.innerHeight);
	if (scrollStage === 3) window.scrollTo(0, window.innerHeight * 2);

	// UI <
	return (
		<React.Fragment>
			<div className='parallax'></div>
			<div className='landing-main'>
				<div className='landing-box box-1'>
					<div className='box-content'>INFO</div>
				</div>
				<div className='landing-box box-2'>
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
			</div>
		</React.Fragment>
	);
};

export default LandingMain;
