import React from "react";
import "./landing.css";
import Login from "./components/Login";
import LoginRegister from "./components/LoginRegister";
import Contact from "./components/Contact";

const MovingContainer = (props) => {
	const style = {
		width: "200%",
		height: "100%",
		position: "absolute",
		display: "flex",
		transition: ".5s",
		border: "2px solid red",
		left: props.page ? "-100%" : "0%",
	};
	return (
		<React.Fragment>
			<div style={style}>{/* {" "}
				<LoginRegister />
				<Contact /> */}</div>
		</React.Fragment>
	);
};

const Landing = () => {
	//// UI >
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
	const [page, setPage] = React.useState(0);
	const [scrollStage, setScrollStage] = React.useState(1);

	// React.useEffect(() => {
	// 	if (scrollStage === 1) window.scrollTo(0, 0);
	// 	if (scrollStage === 2) window.scrollTo(0, window.innerHeight);
	// 	if (scrollStage === 3) window.scrollTo(0, window.innerHeight * 2);
	// }, [scrollStage]);
	if (scrollStage === 1) window.scrollTo(0, 0);
	if (scrollStage === 2) window.scrollTo(0, window.innerHeight);
	if (scrollStage === 3) window.scrollTo(0, window.innerHeight * 2);

	window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
	window.addEventListener("scroll", () => {
		let scrollPosition = window.pageYOffset;
		const parallax = document.querySelector(".parallax");
		parallax.style.transform = `translateY(${scrollPosition * 0.6}px)`;
	});
	//// < UI
	return (
		<React.Fragment>
			<div className='wrapperka'>
				<div className='parallax'></div>
				<div className='info-wrapper'>
					<h1>Simas Zurauskas</h1>
					{/* <Login className='Login' /> */}
				</div>

				{windowWidth > 768 ? (
					<React.Fragment>
						<div className='form-wrapper'>
							{/* <LoginRegister page={page}></LoginRegister> */}
							<MovingContainer page={page} />

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
						<div className='form-wrapper-2'></div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<div className='form-wrapper'>
							<LoginRegister />
							<div className='form-navigaror'></div>
						</div>
						<div className='form-wrapper-2'>
							<Contact />
						</div>
					</React.Fragment>
				)}

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

export default Landing;
